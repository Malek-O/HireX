import Upload from "../components/Upload"
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { TableHead } from "../components/DashboardTable/TableHead"
import SkeletonTable from "../components/SkeletonTable"
import UploadIcon from "../svgs/UploadIcon"
import { useState, useMemo } from "react"
import UploadBox from "../components/UploadBox"
import { columns } from "../components/DashboardTable/columns"
import { TableOptions, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, OnChangeFn } from "@tanstack/react-table"
import TableBody from "../components/DashboardTable/TableBody"

interface MyTableOptions<T extends Record<string, unknown>> extends TableOptions<T> {
    data: any;
}
const Dashboard = () => {

    const [openUpload, setOpenUpload] = useState(false);
    const [sorting, setSorting] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, data: Cdata, isError } = useQuery({
        queryKey: ['candidates'],
        queryFn: () => axiosPrivate.get('/candidate')
    })

    const data: any = useMemo(() => Cdata?.data, [Cdata?.data])
    const tableOptions: MyTableOptions<any> = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting
        },
        onSortingChange: setSorting as OnChangeFn<SortingState>,
    };
    const table = useReactTable(tableOptions);


    if (isError) return <h1 className='text-center mt-20 text-2xl'>Something went wrong</h1>

    return (
        <>
            {!isLoading ?
                <>
                    {Cdata?.data.length ?
                        <>
                            {openUpload && <UploadBox setOpenUpload={setOpenUpload} />}
                            <div className={`${openUpload && 'blur-sm'} transition ease-in-out duration-200`}>
                                <Upload setOpenUpload={setOpenUpload} />
                                <div className="relative overflow-x-auto md:mx-20 mt-12">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                        <TableHead table={table} flexRender={flexRender} />
                                        <TableBody table={table} flexRender={flexRender} />
                                    </table>
                                </div>
                            </div>
                        </>
                        :
                        <div className={`${openUpload && 'blur-sm'}`}>
                            <div className="w-[450px] mx-auto">
                                <UploadIcon />
                            </div>
                            <h1 className="text-center text-3xl font-bold">Pretty empty right here! , Lets upload your PDF file</h1>
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={() => setOpenUpload(true)}
                                    className=" shadow-md rounded-lg bg-[#9F6DDE] p-3  text-lg px-10 text-white transition duration-75 hover:bg-slate-950">
                                    Upload</button>
                            </div>
                        </div>
                    }
                </>
                : <SkeletonTable />}

        </>
    )
}
export default Dashboard