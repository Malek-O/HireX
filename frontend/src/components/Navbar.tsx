import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-white md:px-20 px-3 py-3">
            <Link to="/" className="text-black text-lg">HireX</Link>
            <div className="flex items-center gap-3">
                <Link to={'/signin'} className="cursor-pointer text-black text-lg">Sign in</Link>
                <button
                    className="rounded-lg bg-[#9F6DDE] p-2 text-lg px-6 text-white transition duration-75 hover:bg-[#4d2e74]">Get
                    started</button>
            </div>
        </nav>
    )
}

export default Navbar