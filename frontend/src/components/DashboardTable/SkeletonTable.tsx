import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonTable = () => {
    return (
        <>
            <div className="relative overflow-x-auto md:mx-20 mt-12">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
                        <tr>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"> <Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /></th>
                            <th scope="col" className="px-6 py-3"><Skeleton /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[5, 5, 5, 5, 5].map((val, index) => {
                            return (
                                <tr key={index} className="bg-white border-b  dark:border-gray-300">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        <Skeleton />
                                    </th>
                                    <td className="px-6 py-4">
                                        <Skeleton />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap ">
                                        <Skeleton />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className={`rounded-lg p-2bg-green-200 text-green-700`}><Skeleton /></p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className={`rounded-lg p-2bg-green-200 text-green-700`}><Skeleton /></p>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SkeletonTable