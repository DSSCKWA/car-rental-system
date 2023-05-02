export function Table({ columns, data, keys }) {
    const tableRows = []

    for (const row of data) {
        const tableCells = []
        for (const column of columns) {
            switch (column.type) {
                case 'text':
                    tableCells.push(<td key={column.key}>{row[column.key]}</td>)
                    break
                case 'select':
                    tableCells.push(<td key={column.key}>
                        <select name={column.key} value={row[column.key]} onChange={column.onChange.bind(null, row)}>
                            {column.options.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </td>)
                    break
                case 'date':
                    tableCells.push(<td key={column.key}>{new Date(row[column.key]).toLocaleDateString('en-GB')}</td>)
                    break
                case 'button':
                    tableCells.push(<td key={column.key}><button onClick={column.onClick.bind(null, row)}>{column.label}</button></td>)
                    break
                default:
                    tableCells.push(<td key={column.key}>{row[column.key]}</td>)
                    break
            }
        }
        tableRows.push(<tr key={row[keys]}>{tableCells}</tr>)
    }

    return (
        <table>
            <thead>
                <tr>
                    {columns?.map(column => <th key={column.key}>{column.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}
