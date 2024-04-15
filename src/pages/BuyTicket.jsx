import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Input from '../component/Input';
import { Button } from '../component';
import { useDispatch } from "react-redux";
import { fillEventDetail } from '../store/authSlice';


function BuyTicket() {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm();
    const [post, setPost] = useState(null);
    const [postName, setPostsName] = useState(null)
    const [noOfTickAvl, setNoOfTicAvl] = useState(null);
    const { slug } = useParams()
    const navigate = useNavigate()
    console.log(slug)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log(post)
                    setPost(post)
                    setPostsName(post.eventname)
                    setNoOfTicAvl(post.NumberOfSeats)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const submit = async (data) => {
        setError("")
        if (data.eventNoOfTicket > noOfTickAvl) {
            setError("Please Enter valid Number of Tickets!!")
            return;
        }
        post.NumberOfSeats = noOfTickAvl - data.eventNoOfTicket;
        appwriteService.updateEvent(slug, { ...post });
        const userData = {
            'eventName': postName,
            'NoOfTickets': data.eventNoOfTicket
        }
        if (userData) {
            console.log(userData)
            dispatch(fillEventDetail(userData));
        }
        navigate(`/post/${postName}`)
    }
    return (<>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className='py-8'>

                <h1>
                    Event Name: {postName}
                </h1>
                <Input
                    label="Enter Number of Ticket :"
                    placeholder="Number of ticket"
                    type="number"
                    className="mb-4"
                    {...register("eventNoOfTicket", { required: true })}
                />
                <Button type="submit" bgColor="bg-green-500" className="w-full">
                    {"Buy"}
                </Button>
            </div>
        </form>
    </>
    )
}

export default BuyTicket