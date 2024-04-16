import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deleteEvent = () => {
        appwriteService.deleteEvent(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-100">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.eventname}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-event/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deleteEvent}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold mb-2">Event Name: </h1>
                    <h2 className="text-xl font-semibold mb-4">{post.eventname}</h2>
                </div>
                <div className="browser-css mb-6">
                    <h2 className="text-2xl font-bold mb-2">Event Content: </h2>
                    <div className="text-lg leading-relaxed">{parse(post.content)}</div>
                </div>
                <div className="browser-css mb-6">
                    <h2 className="text-2xl font-bold mb-2">Number of Tickets Available: </h2>
                    <div className="text-lg">{post.NumberOfSeats}</div>
                </div>
                <div className="browser-css">
                    <Link to={`/buy-event-tickets/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Buy Tickets
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    ) : null;
}
