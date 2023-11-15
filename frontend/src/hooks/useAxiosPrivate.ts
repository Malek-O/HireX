import { axiosPrivate } from "../api/axios"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"
import { useEffect } from "react"

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const { auth } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`

                }
                return config;
            }, (err) => Promise.reject(err)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log(error);
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    // the bellow line is added becuase when i upload the pdf when token expired it gave me error that server
                    // dont see pdf cuz i didnt set the content type etc. so i put it there when its retrying
                    if (prevRequest.url === "/files") {
                        prevRequest.headers['Content-Type'] = `multipart/form-data`
                    }
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate