
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [user, setuser] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const storeuser = localStorage.getItem("user")
        if (storeuser) {
            setuser(JSON.parse(storeuser))
        }
    }, [])

    const HandleLogOut = () => {
        localStorage.removeItem("user")
        setuser(null)
        setIsSidebarOpen(false);
    };

    return (
        <div>
            <header className="z-20 relative flex justify-between items-center px-8 py-6">
                <div className="text-3xl font-bold">Jewls</div>
                <nav className="hidden md:flex space-x-6 text-sm">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/blog" className="hover:underline">Blog</Link>
                    <Link to="/shop" className="hover:underline">Shop</Link>
                    <Link to="/contactus" className="hover:underline">Contact Us</Link>
                    <Link to="/aboutus" className="hover:underline">About Us</Link>
                    <Link to="/admin" className="hover:underline">Admin</Link>
                </nav>
                <div className="flex space-x-4 items-center">
                    {user ? (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center space-x-1 text-sm"
                        >
                            👤 <span>{user.name}</span>
                        </button>
                    ) : (
                        <Link to="/login" className="hover:underline">Login</Link>
                    )}
                    
                        <Link to="/cartpage" className="hover:underline">🛒</Link>

                </div>

                
                {isSidebarOpen && (
                    <div className="space-y-2">
                        <h3 className="font-semibold border-b pb-1">My Account</h3>

                        
                        <div className="space-y-1 text-sm">
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                        </div>

                        
                        <Link  to="/orders"
                            className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            View My Orders
                        </Link>

                        <button onClick={HandleLogOut} className='bg-red-600 text-black p-2 rounded-xl ml-18'>Logout</button>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Navbar
