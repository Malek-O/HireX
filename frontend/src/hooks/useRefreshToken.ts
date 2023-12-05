import axios from "../api/axios"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            })
            console.log(response.data);
            setAuth(response.data)
            return response.data.accessToken
        } catch (error) {
            console.log(error);
            setAuth(null)
            navigate('/signin', { replace: true })
        }
    }
    return refresh;
}

export default useRefreshToken