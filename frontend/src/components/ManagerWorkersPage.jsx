import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

export function ManagerWorkersPage() {

    const [workers, setWorkers] = useState(null)
    useEffect(() => {
        fetch('/api/worker/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setWorkers(data)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }, [])

    function change_worker_status(id, account_status) {
        fetch(`/api/worker/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({account_status})
        })
    }

    return (
        <div className='manager_workers_page'>
            <h1>Workers</h1>
            <Link to="/manager/add-worker">Add worker</Link>
            <table>
                <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Birth date</th>
                <th>Status</th>
                <th>Actions</th>
                </thead>
                <tbody>{workers?.map(worker => <tr>
                    <td>{worker.user_id}</td>
                    <td>{worker.name}</td>
                    <td>{worker.surname}</td>
                    <td>{worker.user_email_address}</td>
                    <td>{worker.phone_number}</td>
                    <td>{new Date(worker.date_of_birth).toLocaleDateString()}</td>
                    <td>{worker.account_status}</td>
                    <td>
                        <button onClick={() => {
                            change_worker_status(worker.user_id, worker.account_status === "deleted" ? "active" : "deleted")
                        }}>{worker.account_status === "deleted" ? "Activate" : "Delete"}
                        </button>
                    </td>
                </tr>)}</tbody>
            </table>
        </div>
    )
}
