import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export function WorkerRentalsPage() {

    const navigate = useNavigate()
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
                data.sort((a, b) => a.rental_id - b.rental_id);
                setRentals(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleString('en-GB', options);
    }

    return (
        <div className='worker_rentals_page page_content'>
            <h2>Rentals</h2>
            <table>
                <thead>
                <th>Rental ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Registration number</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Policy</th>
                </thead>
                <tbody>{rentals?.map(rental => <tr>
                    <td>{rental.rental_id}</td>
                    <td>{rental.name}</td>
                    <td>{rental.surname}</td>
                    <td>{rental.user_email_address}</td>
                    <td>{rental.phone_number}</td>
                    <td>{rental.brand}</td>
                    <td>{rental.model}</td>
                    <td>{rental.registration_number}</td>
                    <td>{formatDate(rental.start_time)}</td>
                    <td>{formatDate(rental.end_time)}</td>
                    <td>{rental.policy_name}</td>
                </tr>)}</tbody>
            </table>
        </div>
    )
}