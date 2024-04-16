import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, eventname, featuredimage }) {
    return (
        <Link to={`/post/${$id}`} className="block rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
            <div className='relative'>
                <img
                    src={featuredimage ? appwriteService.getFilePreview(featuredimage) : ''}
                    alt={eventname ? eventname : ''}
                    className="object-cover w-full h-60"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-40 text-white py-2 px-4">
                    <h2 className="text-lg font-semibold">{eventname}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
