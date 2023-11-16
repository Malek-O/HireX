import { useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"
import { candidateProps } from "../types/type.t"
import toast from "react-hot-toast"
import Modal from "./Modal"
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query"

type stateBol = {
    reject: boolean,
    accpet: boolean,
}

const SingleCandidate = (props: candidateProps) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [modal, setModal] = useState<stateBol>({
        reject: false,
        accpet: false,
    })

    const axiosPrivate = useAxiosPrivate()
    const openCandidateCV = async () => {
        try {
            const response = await axiosPrivate.get(`./candidate/file/${props.candidate_id}`, { responseType: 'blob' })
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccept = async () => {
        toast.loading('Accepting candidate...')
        try {
            await axiosPrivate.patch(`/candidate/${props.candidate_id}`, { status: "APPROVED" })
            toast.dismiss()
            toast.success(`Candidate ${props.candidate_name} is Approved`, { duration: 4000 })
            setModal(prev => ({ ...prev, accpet: false }))
            queryClient.invalidateQueries(["candidates"] as InvalidateQueryFilters)
            navigate('/candidates', { replace: true })
        } catch (error) {
            console.log(error);
            toast.dismiss()
            toast.error('Something went wrong')
        }
    }

    const handleDelete = async () => {
        toast.loading('Deleting candidate...')
        try {
            await axiosPrivate.delete(`/candidate/${props.candidate_id}`)
            toast.dismiss()
            toast.success(`Candidate ${props.candidate_name} is Deleted`, { duration: 4000 })
            setModal(prev => ({ ...prev, reject: false }))
            queryClient.invalidateQueries(["candidates"] as InvalidateQueryFilters)
            navigate('/candidates', { replace: true })
        } catch (error) {
            console.log(error);
            toast.dismiss()
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            {modal.reject && <Modal handleAccept={handleDelete} title="Are you sure ?, this action will delete the candidate permenantly" setModal={setModal} />}
            {modal.accpet && <Modal handleAccept={handleAccept} title="Are you sure ?, this action will accept the candidate" setModal={setModal} />}
            <div className={`${(modal.accpet || modal.reject) && 'opacity-40'}`}>
                <div className="py-4 px-4 bg-[#9F6DDE] flex justify-between md:max-w-6xl items-center mx-4 md:mx-auto mt-12 rounded-md">
                    <h1 className="text-white text-lg">{props?.candidate_name}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-10 h-10 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                </div>

                <div className="bg-[#ecececf4] md:max-w-6xl mx-4 md:mx-auto my-8 rounded-md p-5 shadow-lg relative">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-8">
                        <div>
                            <h1 className="text-lg font-bold">Email</h1>
                            <a href={`mailto:${props?.candidate_email}`} className="text-base text-black/50">{props?.candidate_email}</a>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Phone</h1>
                            <a href={`tel:${props?.candidate_phone}`} className="text-base text-black/50">{props?.candidate_phone}</a>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Nationality</h1>
                            <h4 className="text-base text-black/50">{props?.candidate_nationality}</h4>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Designation</h1>
                            <h4 className="text-base text-black/50">{props?.candidate_designation}</h4>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Education</h1>
                            <h4 className="text-base text-black/50">{props?.candidate_edu}</h4>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">GPA</h1>
                            <h4 className="text-base text-black/50">{props?.candidate_gpa}</h4>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-lg font-bold">Experiences</h1>
                        <ul className="list-disc">
                            {props?.xp.map((item) => {
                                return (
                                    <div key={item.cxp_id}>
                                        <li className="ms-8">
                                            <h4 className="text-base text-black/50">position : {item.cxp_position}</h4>
                                        </li>
                                        <li className="ms-8">
                                            <h4 className="text-base text-black/50">duration : {item.cxp_duration}</h4>
                                        </li>
                                    </div>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-lg font-bold">Languages</h1>
                        <ul className="list-disc">
                            {props?.langs?.map((item) => {
                                return (
                                    <li className="ms-8" key={item.cl_id}>
                                        <h4 className="text-base text-black/50">{item.cl_name}</h4>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-lg font-bold">Skills</h1>
                        <div className="flex flex-wrap mt-4 gap-2 mb-10">
                            {props?.skills?.map((item) => {
                                return (
                                    <h1 key={item.ck_id} className="p-2 bg-[#9F6DDE] text-white rounded-md">{item.ck_name}</h1>
                                )
                            })}

                        </div>
                    </div>

                    <div className="flex my-20 justify-center">
                        <button className=" p-2 px-20 rounded-lg transition-all duration-200 text-[#7d49bd] bg-transparent border-[#9F6DDE] border-2 border-solid 
                    hover:bg-[#9F6DDE] hover:text-white"
                            onClick={openCandidateCV}
                        >Preview Full CV</button>


                    </div>
                    {props.status !== "APPROVED" &&
                        <button
                            onClick={() => setModal(prev => ({ ...prev, accpet: true }))}
                            className="absolute p-2 bottom-0 transition-all duration-300 rounded-ee-lg rounded-ss-lg  right-0 bg-green-200 text-green-800 hover:bg-green-300">
                            Accept
                        </button>
                    }

                    <button
                        onClick={() => setModal(prev => ({ ...prev, reject: true }))}
                        className="absolute p-2 bottom-0 transition-all duration-300 rounded-es-lg rounded-se-lg  left-0 bg-red-200 text-red-800 hover:bg-red-300">
                        Reject
                    </button>
                </div>
            </div>
        </>
    )
}

export default SingleCandidate