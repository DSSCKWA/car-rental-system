import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export function ClientRentalsPage() {

    const navigate = useNavigate()
    const [rentals, setRentals] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

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

    async function changeStatus(rental_id, status, client_id, start_time) {
        await fetch(`/api/rentals/${rental_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: client_id,
                rental_status: status,
                start_time: formatDate(start_time)
            })
        })
            .catch(error => {
                console.log('Error changing rental status', error)
            })
        get_rentals()
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

    function isMoreThan24Hours(startTime) {
        const currentTime = new Date().getTime();
        const rentalTime = new Date(startTime).getTime();
        return (rentalTime - currentTime) > (24 * 60 * 60 * 1000);
    }

    return (
        <div className='client_rentals_page page_content'>
            <h2>Rentals</h2>
            <table>
                <thead>
                <th>Brand</th>
                <th>Model</th>
                <th>Registration number</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Status</th>
                <th>Policy</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {rentals?.map(rental => {
                    return (
                        <tr key={rental.rental_id}>
                            <td>{rental.brand}</td>
                            <td>{rental.model}</td>
                            <td>{rental.registration_number}</td>
                            <td>{formatDate(rental.start_time)}</td>
                            <td>{formatDate(rental.end_time)}</td>
                            <td>{rental.rental_status.replace(/_/g, ' ')}</td>
                            <td>{rental.policy_name}</td>
                            {isMoreThan24Hours(rental.start_time) && rental.rental_status !== "canceled" && (
                                <td>
                                    <button onClick={() => {
                                        changeStatus(rental.rental_id, "canceled", rental.client_id, rental.start_time);
                                    }}>Cancel
                                    </button>
                                </td>
                            )}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}