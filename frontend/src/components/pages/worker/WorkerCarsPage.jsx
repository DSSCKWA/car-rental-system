import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function WorkerCarsPage() {
    const navigate = useNavigate()
    const [vehicles, setVehicles] = useState(null)
    useEffect(() => {
        get_vehicles()
    }, [])

    function get_vehicles() {
        fetch('/api/vehicles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.vehicle_id - b.vehicle_id);
                setVehicles(data)
            })
            .catch(error => {
                console.log('Error getting vehicle info', error)
            })
    }

    return (
        <div className='worker_vehicles_page page_content'>
            <h2>Vehicles</h2>
            <table>
                <thead>
                    <th>Vehicle ID</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Registration Number</th>
                    <th>Technical Review Date</th>

                    <th>Status</th>
                </thead>
                <tbody>{vehicles?.map(vehicle => <tr>
                    <td>{vehicle.vehicle_id}</td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.registration_number}</td>
                    <td>{new Date(vehicle.technical_review_date).toISOString().substring(0, 10)}</td>

                    <td>{vehicle.status.replace(/_/g, ' ')}</td>
                </tr>)}</tbody>
            </table>
        </div >
    )
}