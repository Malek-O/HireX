import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'


const LoggedNav = () => {


    const dropdown = useRef<HTMLDivElement>(null)
    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()
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
                >Dashboard</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </div>

            <div ref={dropdown}
                className="z-10 hidden absolute md:right-20 top-12 bg-[#fcfcfc] divide-y divide-gray-100 rounded-md shadow w-44 ">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li className="p-3 bg-gray-100 border-b-2 border-violet-950">
                        <h1 className='text-violet-950 px-2 font-semibold'>{auth?.useremail}</h1>
                    </li>
                    <li className="px-3 my-2">
                        <Link to={'/candidates'} className={`${location.pathname === '/candidates' && 'bg-gray-200 '} flex items-center text-sm font-medium justify-between rounded-md text-left mx-auto w-full px-2 py-2 hover:transition-all hover:duration-100  hover:bg-gray-200  text-black`}>Dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                        </Link>
                    </li>
                    <li className="px-3 my-2">
                        <button onClick={handleLogout} className="hover:transition-all hover:duration-100  flex items-center justify-between text-left text-sm font-medium rounded-md mx-auto w-full px-2 py-2  hover:bg-red-300  text-red-800">Log
                            out
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default LoggedNav