import { candidateProps } from '../types/type.t'

const TableRow = (props: candidateProps) => {
    return (
        <tr className="bg-white border-b  dark:border-gray-300">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {props?.candidate_name}
            </th>
            <td className="px-6 py-4">
                {props?.candidate_email}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_phone}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_gpa}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_edu}
            </td>
            <td className="px-6 py-4">
                {props?.candidate_designation}
            </td>
            <td className="px-6 py-4 text-center">
                <p className="bg-orange-200 text-yellow-700 rounded-lg p-2">{props.status}</p>
            </td>
            <td className="px-6 py-4">
                <button
                    className="rounded-lg bg-[#9F6DDE] py-2 px-5  text-white transition duration-75 hover:bg-[#4d2e74]">Details</button>
            </td>
        </tr>
    )
}

export default TableRow