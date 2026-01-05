import React from 'react';

const Table = ({ columns, data, onRowClick, actions, ...props }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key || col.label}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                            >
                                {col.label}
                            </th>
                        ))}
                        {actions && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
                            >
                                {columns.map((col) => (
                                    <td key={`${row.id}-${col.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-10 text-center text-sm text-slate-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
