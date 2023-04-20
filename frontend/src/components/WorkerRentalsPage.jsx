import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

export function WorkerRentalsPage() {

    const [rentals, setRentals] = useState(null)
    useEffect(()=>{
        get_rentals()
    }, [])

    function get_rentals() {
        fetch('/api/rental/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a,b) => a.rental_id - b.rental_id);
                setRentals(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    // async function change_rental_status(id, account_status) {
    //     await fetch(`/api/rental/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({account_status})
    //     })
    //     get_rentals()
    // }

    return (
        <div className='manager_rentalsManagerRentalsPage.jsx_page'>
            <h1>Rentals</h1>
            {/*<Link to="/manager/add-rental">Add rental</Link>*/}
            <table>
                <thead>
                <th>Rental ID</th>
                <th>Client ID</th>
                <th>Vehicle ID</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Discount code ID</th>
                <th>Policy number</th>
                </thead>
                <tbody>{rentals?.map(rental => <tr>
                    <td>{rental.rental_id}</td>
                    <td>{rental.client_id}</td>
                    <td>{rental.vehicle_id}</td>
                    <td>{rental.start_time}</td>
                    <td>{rental.end_time}</td>
                    {/*<td>{new Date(rental.date_of_birth).toLocaleDateString()}</td>*/}
                    <td>{rental.discount_code_id}</td>
                    <td>{rental.policy_number}</td>
                    {/*<td>*/}
                    {/*    <button onClick={() => {*/}
                    {/*        change_rental_status(rental.user_id, rental.account_status === "deleted" ? "active" : "deleted")*/}
                    {/*    }}>{rental.account_status === "deleted" ? "Activate" : "Delete"}*/}
                    {/*    </button>*/}
                    {/*</td>*/}
                </tr>)}</tbody>
            </table>
        </div>
    )
}
