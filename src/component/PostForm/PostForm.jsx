import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, watch, control, getValues } = useForm({
        defaultValues: {
            eventname: post?.eventname || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            eventVenue: post?.eventVenue || "I-Hall",
            eventdate: post?.eventdate || "",
            NumberOfSeats: post?.NumberOfSeats || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Heeeey")
        const file = post ? post.featuredimage : (await appwriteService.uploadFile(data.image[0]));
        console.log(post)
        if (file) {
            if (post) {
                console.log("Heeeey")
                const dbPost = await appwriteService.updateEvent(post.$id, { ...data, featuredimage: file.$id });
                dbPost && navigate(`/post/${dbPost.$id}`);
            } else {
                const dbPost = await appwriteService.createEvent({ ...data, userId: userData.$id, featuredimage: file.$id });
                dbPost && navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "eventname") {
                setValue("slug", slugTransform(value.eventname), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="EventName :" placeholder="EventName" className="mb-4" {...register("eventname", { required: true })} />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.eventname} className="w-full rounded-lg mb-4" />}
                <Input
                    label="Number of Seats :"
                    placeholder="Number of Seats"
                    type="number"
                    className="mb-4"
                    {...register("NumberOfSeats", { required: true })}
                />
                <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("eventstatus", { required: true })} />
                <Select options={["Loards", "Oval", "I-Hall"]} label="Event Venue" className="mb-4" {...register("eventVenue", { required: true })} />
                <Input label="Event Date :" placeholder="DD\MM\YY" className="mb-4" {...register("eventdate", { required: true })} />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
