import { useSelector } from "react-redux";
function UserProfile() {
    const userData = useSelector((state) => state.auth.userData);
    const eventDetail = useSelector((state) => state.auth.eventData)
    console.log(eventDetail)
    return (
        <div>{<ul className='flex ml-auto'>
            {

                eventDetail?.map((item) => (
                    <li key={item.eventName}>
                        <h1>{`${item.eventName} : ${item.NoOfTickets}`}</h1>
                    </li>
                ))


            }</ul>}</div>
    )
}

export default UserProfile