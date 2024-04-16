import React from "react";
import { useSelector } from "react-redux";

function UserProfile() {
    const userData = useSelector((state) => state.auth.userData);
    const eventDetail = useSelector((state) => state.auth.eventData);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mx-auto">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
            </div>
            {/* Add additional user details or components here */}
        </div>
    );
}

export default UserProfile;
