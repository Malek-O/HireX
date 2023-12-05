import { useLoaderData } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import SingleCandidate from '../components/candidatePage/SingleCandidate';
import SingleCandidateSkeleton from '../components/candidatePage/SingleCandidateSkeleton';

const Candidate = () => {

    let { params }: any = useLoaderData();

    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data, isError } = useQuery({
        queryKey: [`candidate${params.id}`],
        queryFn: () => axiosPrivate.get(`/candidate/${params.id}`)
    })
    if (isError) return <h1 className='text-center mt-20 text-2xl'>404 not found</h1>


    return (
        <>
            {!isLoading ?
                <SingleCandidate {...data?.data} />
                : <SingleCandidateSkeleton />}

        </>
    )
}

export default Candidate