import React from "react"

const TableBody = ({ table, flexRender }: any) => {
    return (
        <tbody>
            {table.getRowModel().rows.map((rows: any) => {
                return (
                    <tr key={rows.id} className="bg-white border-b  dark:border-gray-300">
                        {rows.getVisibleCells().map((cell: any) => {
                            return (
                                <React.Fragment key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </React.Fragment>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody