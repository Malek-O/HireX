import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const LoggedNav = () => {


    const dropdown = useRef<HTMLDivElement>(null)
    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axiosPrivate.get('/logout')
            setAuth(null)
            navigate('/', { replace: true })
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (event.target.id !== "dropdownDefaultButton" && dropdown.current /* && !dropdown.current?.contains(event.target) */) {
                dropdown.current.classList.add("hidden")
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between bg-white md:px-20 px-3 py-3 relative">
            <Link to="/" className="text-black text-lg">HireX</Link>

            <div className="flex items-center gap-3">
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" type="button"
                    className="cursor-pointer text-black text-lg"
                    onClick={() => {
                        if (dropdown.current) {
                            dropdown.current.classList.toggle('hidden')
                        }
                    }}
                >{auth?.useremail}</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </div>

            <div ref={dropdown}
                className="z-10 hidden absolute md:right-20 top-12 bg-[#f6f2f7] divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li className="px-3 my-2">
                        <Link to={'/candidates'} className="block text-lg font-medium rounded-md text-center mx-auto w-full px-2 py-2  hover:bg-gray-200  text-black">Dashboard</Link>
                    </li>
                    <li className="px-3 my-2">
                        <button onClick={handleLogout} className="block text-lg font-medium rounded-md mx-auto w-full px-2 py-2  hover:bg-red-300  text-red-800">Log
                            out</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default LoggedNav