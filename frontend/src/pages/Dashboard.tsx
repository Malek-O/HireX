import Upload from "../components/Upload"
import { useQuery, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { TableHead } from "../components/TableHead"
import TableRow from "../components/TableRow"
import { candidateProps } from '../types/type.t'
const Dashboard = () => {

    const queryClient = useQueryClient()
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['candidates'],
        queryFn: () => axiosPrivate.get('/candidate')
    })


    return (
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
    )
}
export default Dashboard