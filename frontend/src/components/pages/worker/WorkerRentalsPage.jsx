import { useEffect, useState } from 'react'
import { Table } from '../../page_elements/Table.jsx'

export function WorkerRentalsPage() {
    const [rentals, setRentals] = useState(null)
    useEffect(() => {
        get_rentals()
    }, [])

    function get_rentals() {
        fetch('/api/rentals/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.rental_id - b.rental_id)
                for (const rental of data) {
                    rental.start_time = formatDate(rental.start_time)
                    rental.end_time = formatDate(rental.end_time)
                }
                setRentals(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    async function changeStatus(id, status) {
        await fetch(`/api/rentals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rental_status: status,
            }),
        })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
        get_rentals()
    }

    function getRow(row) {
        const status = row.rental_status
        const rental_id = row.rental_id
        return <>
            {['upcoming', 'ongoing'].includes(status) &&
                <td key='action'>
                    <button onClick={e => {
                        { status === 'ongoing' ? changeStatus(rental_id, 'in_review') : changeStatus(rental_id, 'canceled') }
                    }}>
                        {status === 'ongoing' ? 'End' : 'Cancel'}
                    </button>
                </td>
            }
        </>
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return date.toLocaleString('en-GB', options)
    }

    if (!rentals) return <div>Loading...</div>

    return (
        <div className='worker_rentals_page page_content'>
            <h2>Rentals</h2>
            <Table data={rentals} keys={'rental_id'} columns={[
                { label: 'Rental ID', key: 'rental_id', type: 'text' },
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'Surname', key: 'surname', type: 'text' },
                { label: 'Email', key: 'user_email_address', type: 'text' },
                { label: 'Phone number', key: 'phone_number', type: 'text' },
                { label: 'Brand', key: 'brand', type: 'text' },
                { label: 'Model', key: 'model', type: 'text' },
                { label: 'Registration number', key: 'registration_number', type: 'text' },
                { label: 'Start time', key: 'start_time', type: 'text' },
                { label: 'End time', key: 'end_time', type: 'text' },
                { label: 'Status', key: 'rental_status', type: 'text' },
                { label: 'Policy', key: 'policy_name', type: 'text' },
                { label: 'Action', type: 'raw', getRow: row => getRow(row) },
            ]} />
        </div >
    )
}
