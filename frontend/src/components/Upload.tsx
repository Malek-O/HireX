import Spinner from "./Spinner"
import { useIsMutating } from '@tanstack/react-query'

type uploadProps = {
    setOpenUpload: React.Dispatch<React.SetStateAction<boolean>>
}

const Upload = ({ setOpenUpload }: uploadProps) => {
    const isMutating = useIsMutating()

    return (
        <div className="flex justify-between items-center md:mx-20 mt-24 mx-5">
            <h1 className="text-2xl font-bold">Candidates</h1>
            {!isMutating ? <button
                onClick={() => setOpenUpload(true)}
                className="shadow-md rounded-lg bg-[#9F6DDE] p-1 text-lg px-6 text-white transition duration-75 hover:bg-slate-950">
                Upload</button> : <Spinner />}



        </div>
    )
}

export default Upload