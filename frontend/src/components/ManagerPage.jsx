import { Link } from 'react-router-dom'

export function ManagerPage() {
    return (
        <div className='manager_page'>
            <h1>Manager</h1>
            <Link to="/manager/workers">Workers</Link>
            <Link>Raports</Link>
        </div>
    )
}
