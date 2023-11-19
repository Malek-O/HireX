import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query'
import PdfIcon from '../svgs/PdfIcon'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Spinner from './Spinner'

const UploadBox = ({ setOpenUpload }: { setOpenUpload: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [pdfFile, setPdfFile] = useState<File | null>()
    const [progress, setProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const onDrop = useCallback((acceptedFiles: any) => {
        setIsCompleted(false)
        if (acceptedFiles[0].path.endsWith('.pdf')) {
            setPdfFile(acceptedFiles[0])
        } else {
            toast.error("File should be PDF format")
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const config = {
        onUploadProgress: (progressEvent: any) => {
            const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100
            setProgress(percentCompleted)
        }
    }

    const newFileMutation = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            if (!pdfFile) {
                toast.error('File required')
                return Promise.reject("File required")
            }
            formData.append('file', pdfFile);
            return axiosPrivate.post('/candidate', formData, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress: config.onUploadProgress })
        },
        onMutate: () => {
            setLoading(true)
            toast.loading("Adding file...")
        },
        onSuccess: () => {
            toast.dismiss()
            toast.success("file uploaded !")
            setProgress(0)
            setIsCompleted(true)
            setPdfFile(null)
            setOpenUpload(false)
            setLoading(false)
            queryClient.invalidateQueries(["candidates"] as InvalidateQueryFilters)
        },
        onError: () => {
            toast.dismiss()
            toast.error("something went wrong !")
        }
    })


    return (
        <div className="w-[100vw] h-[70vh] z-[600] fixed flex justify-center items-center">
            <div className="flex justify-center w-full mx-auto sm:max-w-lg ">
                <div className="relative flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                    <button onClick={() => setOpenUpload(false)} className="text-xs py-[3px] px-[7px] rounded-full bg-red-300  absolute top-3 right-5 text-red-800">X</button>
                    <div className="mt-10 mb-10 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                        <p className="text-xs text-gray-500">File should be of format .pdf</p>
                    </div>
                    {!pdfFile ?
                        <form className="relative w-4/5 h-32 max-w-xs mb-10  bg-gray-100 rounded-md shadow-inner">
                            <label {...getRootProps()} className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                                {
                                    isDragActive ?
                                        <p className="z-10 text-xs font-light text-center text-gray-500"> Drop the files here ...</p> :
                                        <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                                }
                            </label>
                            <input {...getInputProps()} accept='application/pdf' type="file" className="hidden" />
                        </form>
                        :
                        <>
                            <div className='relative w-4/5 p-2 flex justify-between max-w-xs  bg-gray-100 rounded-md shadow-inner'>
                                <div className='p-2 flex gap-2 items-center' >
                                    <h1 className='text-xs'>{pdfFile?.name}</h1>
                                    <div className='w-5 h-5'>
                                        <PdfIcon />
                                    </div>
                                </div>
                                <button onClick={() => setPdfFile(null)} className={`text-xs ${loading && 'hidden'} p-1 px-2 text-red-800 rounded-full absolute top-[-0.875rem] right-[-0.5rem] bg-red-300`}>X</button>
                            </div>
                            <div className='w-4/5'>
                                <button disabled={loading} onClick={() => newFileMutation.mutate()} className=' shadow-md rounded-md my-8 bg-[#9F6DDE] disabled:bg-[#2e1c44] p-0.5 text-lg w-full text-white transition duration-300 hover:bg-slate-950'>Submit</button>
                                {progress > 0 ?
                                    <div className='mb-10'>
                                        <div className='flex items-center gap-2 my-2'>
                                            {progress < 20 ?
                                                <Spinner />
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            }

                                            <h1> File is being uploaded</h1>
                                        </div>
                                        <div className={`flex items-center gap-2 my-2 ${progress < 20 && 'opacity-20'}`}>
                                            {progress < 70 ?
                                                <Spinner />
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            }
                                            <h1 className='whitespace-nowrap'> File is being proccesed by Our Service</h1>
                                        </div>
                                        <div className={`flex items-center gap-2 my-2 ${progress < 70 && 'opacity-20'}`}>
                                            {progress < 95 ?
                                                <Spinner />
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            }
                                            <h1> File inforamtion extracted</h1>
                                        </div>
                                        <div className={`flex items-center gap-2 my-2 ${progress < 95 && 'opacity-20'}`}>
                                            {isCompleted ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                :
                                                <Spinner />
                                            }
                                            <h1>Completed</h1>
                                        </div>
                                    </div>
                                    : ''}
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default UploadBox