import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, eventname, featuredimage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={featuredimage ? appwriteService.getFilePreview(featuredimage) : ''}
                        alt={eventname ? eventname : ''}
                    />
                </div>
                <h2
                    className='text-xl font-bold'
                >{eventname}</h2>
            </div>
        </Link>
    )
}


export default PostCard