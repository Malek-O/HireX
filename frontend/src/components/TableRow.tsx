import { candidateProps } from '../types/type.t'
import { Link } from 'react-router-dom'
const TableRow = (props: candidateProps) => {
    return (
        <tr className="bg-white border-b  dark:border-gray-300">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {props?.candidate_name}
            </th>
            <td className="px-6 py-4">
                {props?.candidate_email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap ">
                {props?.candidate_phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {props?.candidate_gpa?.replace(/ /g, '') || "N/A"}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_edu}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_designation}
            </td>
            <td className="px-6 py-4 text-center">
                <p className={`rounded-lg p-2 ${props.status === "APPROVED" ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-yellow-700'}`}>{props.status}</p>
            </td>
            <td className="px-6 py-4">
                <Link to={`/candidates/${props.candidate_id}`} className="rounded-lg bg-[#9F6DDE] py-2 px-5  text-white transition duration-75 hover:bg-[#4d2e74]">Details</Link>
            </td>
        </tr>
    )
}

export default TableRow