import { Link } from "react-router-dom"

export const columns = [
    {
        accessorKey: 'candidate_name',
        header: 'NAME',
        cell: (props: any) => <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {props?.getValue()}
        </td>
    },
    {
        accessorKey: 'candidate_email',
        header: 'EMAIL',
        cell: (props: any) => <td className="px-6 py-4">
            {props?.getValue()}
        </td>
    },
    {
        accessorKey: 'candidate_phone',
        header: 'PHONE'
        ,
        cell: (props: any) => <td className="px-6 py-4 whitespace-nowrap ">
            {props?.getValue()}
        </td>
    },
    {
        accessorKey: 'candidate_gpa',
        header: 'GPA'
        ,
        cell: (props: any) => <td className="px-6 py-4 whitespace-nowrap ">
            {props?.getValue().replace(/ /g, '') || "N/A"}
        </td>
    },
    {
        accessorKey: 'candidate_edu',
        header: 'EDUACTION',
        cell: (props: any) => <td className="px-6 py-4">
            {props?.getValue()}
        </td>
    },
    {
        accessorKey: 'candidate_designation',
        header: 'DESIGNATION',
        cell: (props: any) => <td className="px-6 py-4">
            {props?.getValue()}
        </td>
    },
    {
        accessorKey: 'status',
        header: 'STATUS',
        cell: (props: any) => <td className="px-6 py-4 text-center">
            <p className={`rounded-lg p-2 ${props?.getValue() === "APPROVED" ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-yellow-700'}`}>
                {props?.getValue()}
            </p>
        </td>
    },

    {
        accessorKey: 'candidate_id',
        header: 'details',
        cell: (props: any) => {
            return (
                <td className="px-6 py-4">
                    <Link to={`/candidates/${props?.getValue()}`} className="rounded-lg bg-[#9F6DDE] py-2 px-5  text-white transition duration-75 hover:bg-[#4d2e74]">Details</Link>
                </td>
            )
        }
    },


]