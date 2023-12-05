import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleCandidateSkeleton = () => {
    return (
        <>
            <div className="py-4 px-4 bg-[#ecececf4]   md:max-w-6xl  mx-4 md:mx-auto mt-12 rounded-md">
                <Skeleton />
            </div>

            <div className="bg-[#ecececf4] md:max-w-6xl mx-4 md:mx-auto my-8 rounded-md p-5 shadow-lg relative">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-8">
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <a className="text-base text-black/50"><Skeleton /></a>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <a className="text-base text-black/50"><Skeleton /></a>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold"><Skeleton /></h1>
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                    </div>
                </div>
                <div className="mt-8">
                    <h1 className="text-lg font-bold"><Skeleton /></h1>
                    <ul className="list-disc">
                        <li className="ms-8">
                            <h4 className="text-base text-black/50"><Skeleton /></h4>
                        </li>
                        <li className="ms-8">
                            <h4 className="text-base text-black/50"><Skeleton /></h4>
                        </li>

                    </ul>
                </div>
                <div className="mt-8">
                    <h1 className="text-lg font-bold"><Skeleton /></h1>
                    <ul className="list-disc">
                        <li className="ms-8" >
                            <h4 className="text-base text-black/50"><Skeleton /></h4>
                        </li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h1 className="text-lg font-bold"><Skeleton /></h1>
                    <div className=" mt-4  mb-10">
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                        <h4 className="text-base text-black/50"><Skeleton /></h4>
                    </div>
                </div>
                <div className="text-center my-20 mx-auto w-[50%]">
                    <h4 className="text-base text-black/50 p-5"><Skeleton /></h4>
                </div>
            </div>
        </>
    )
}

export default SingleCandidateSkeleton