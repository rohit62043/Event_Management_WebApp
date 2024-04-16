/* eslint-disable react/prop-types */
function Logo({ width = '100px' }) {
    return (
        <div className="flex items-center justify-center text-white font-bold" style={{ width, height: '40px', backgroundColor: '#4CAF50', borderRadius: '50px' }}>
            EventManagement
        </div>
    );
}

export default Logo;
