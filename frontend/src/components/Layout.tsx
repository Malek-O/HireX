import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import LoggedNav from './LoggedNav'
import useAuth from '../hooks/useAuth'

const Layout = () => {

    const { auth } = useAuth()
    return (
        <>
            {auth?.useremail ? <LoggedNav /> : <Navbar />}
            <Outlet />
        </>
    )
}

export default Layout