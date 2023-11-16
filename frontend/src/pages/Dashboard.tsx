import Upload from "../components/Upload"
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { TableHead } from "../components/TableHead"
import TableRow from "../components/TableRow"
import { candidateProps } from '../types/type.t'
import SkeletonTable from "../components/SkeletonTable"

const Dashboard = () => {

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
                    <Upload />
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
                </>
                : <SkeletonTable />}

        </>
    )
}
export default Dashboard