export const TableHead = ({ table, flexRender }: any) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            {table.getHeaderGroups().map((headerGroup: any) => {
                return (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                            return (
                                <th className="px-6 py-3" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    <p className="flex items-center gap-2" >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.columnDef.header !== "details" ? header.column.getIsSorted() == 'asc' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                            : header.column.getIsSorted() == 'desc' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                </svg>
                                            : ''}
                                    </p>
                                </th>
                            )
                        })}
                    </tr>
                )
            })}
        </thead>
    )
}
