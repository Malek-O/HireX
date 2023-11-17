import Upload from "../components/Upload"
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { TableHead } from "../components/TableHead"
import TableRow from "../components/TableRow"
import { candidateProps } from '../types/type.t'
import SkeletonTable from "../components/SkeletonTable"
import UploadIcon from "../svgs/UploadIcon"
import { useState } from "react"
import UploadBox from "../components/UploadBox"

const Dashboard = () => {

    const [openUpload, setOpenUpload] = useState(false);
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data, isError } = useQuery({
        queryKey: ['candidates'],
        queryFn: () => axiosPrivate.get('/candidate')
    })
    if (isError) return <h1 className='text-center mt-20 text-2xl'>Something went wrong</h1>
    return (
        <>
            {!isLoading ?
                <>
                    {data?.data.length ?
                        <>
                            {openUpload && <UploadBox setOpenUpload={setOpenUpload} />}
                            <div className={`${openUpload && 'opacity-40'}`}>
                                <Upload setOpenUpload={setOpenUpload} />
                                <div className="relative overflow-x-auto md:mx-20 mt-12">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                        <TableHead />
                                        <tbody>
                                            {data?.data?.map((candidate: candidateProps) => {
                                                return <TableRow key={candidate.candidate_id} {...candidate} />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className="w-[450px] mx-auto">
                                <UploadIcon />
                            </div>
                            <h1 className="text-center text-3xl font-bold">Pretty empty right here! , Lets upload your PDF file</h1>
                            <div className="flex justify-center mt-10">
                                <button
                                    className=" shadow-md rounded-lg bg-[#9F6DDE] p-3  text-lg px-10 text-white transition duration-75 hover:bg-slate-950">
                                    Upload</button>
                            </div>
                        </>
                    }

                </>
                : <SkeletonTable />}

        </>
    )
}
export default Dashboard