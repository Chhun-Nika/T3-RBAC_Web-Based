import { useNavigate } from "react-router-dom";



export default function NotFound () {
    const navigate = useNavigate();
    const handleOnClick = async (e) => {
        e.preventDefault();
        navigate("/");
    }
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 gap-7">
            <h2 className="text-2xl font-semibold">Please login to access this page.</h2>
            <button 
                onClick={handleOnClick}
                className="w-[120px] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
                Go to login
            </button>
        </div>
    )
}