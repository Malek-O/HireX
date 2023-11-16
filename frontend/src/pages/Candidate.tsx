import { useLoaderData } from 'react-router-dom';
import { candidateProps } from '../types/type.t';
import { useQuery, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import SingleCandidate from '../components/SingleCandidate';

const Candidate = () => {

    let { params }: any = useLoaderData();

    const queryClient = useQueryClient()
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data, isError, error } = useQuery({
        queryKey: [`candidate${params.id}`],
        queryFn: () => axiosPrivate.get(`/candidate/${params.id}`)
    })
    if (isError) return <h1 className='text-center mt-20 text-2xl'>404 not found</h1>


    return (
        <>
            {!isLoading ?
                <SingleCandidate {...data?.data} />
                : "Loading..."}

        </>
    )
}

export default Candidate