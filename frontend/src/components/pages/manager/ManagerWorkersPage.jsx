import { useEffect, useState } from 'react'
import { Table } from '../../page_elements/Table.jsx'

export function ManagerWorkersPage() {

    const [workers, setWorkers] = useState(null)
    useEffect(() => {
        get_users()
    }, [])

    function get_users() {
        fetch('/api/worker/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.user_id - b.user_id)
                setWorkers(data)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }

    async function change_worker_status(id, account_status) {
        await fetch(`/api/worker/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_status }),
        })
        get_users()
    }

    if (!workers) return <div>Loading...</div>

    return (
        <div className='manager_workers_page page_content'>
            <h2>Workers</h2>
            <Table data={workers} keys={'user_id'} columns={[{ label: 'ID', key: 'user_id', type: 'text' },
            { label: 'Name', key: 'name', type: 'text' },
            { label: 'Surname', key: 'surname', type: 'text' },
            { label: 'Email', key: 'user_email_address', type: 'text' },
            { label: 'Phone number', key: 'phone_number', type: 'text' },
            { label: 'Birth date', key: 'date_of_birth', type: 'date', format: 'dd/MM/yyyy' },
            { label: 'Status', key: 'account_status', type: 'select', options: ['active', 'deleted'], onChange: (row, e) => change_worker_status(row.user_id, e.target.value) }]} />
        </div>
    )
}
