import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../page_elements/Table.jsx'

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
        // <div className='worker_vehicles_page page_content'>
        //     <h2>Rentals</h2>
        //     <Table data={vehicles} keys={'vehicle_id'} columns={[
        //         { label: 'Vehicle ID', key: 'vehicle_id', type: 'text' },
        //         { label: 'Brand', key: 'brand', type: 'text' },
        //         { label: 'Model', key: 'model', type: 'text' },
        //         { label: 'Registration Number', key: 'registration_number', type: 'text' },
        //         { label: 'Technical Review Date', key: 'technical_review_date', type: 'text' },
        //         { label: 'Status', key: 'status', type: 'text' },
        //     ]} />
        // </div >
        // <div className='worker_vehicles_page page_content'>
        //     <h2>Vehicles</h2>
        //     <table>
        //         <thead>
        //             <th>Vehicle ID</th>
        //             <th>Brand</th>
        //             <th>Model</th>
        //             <th>Registration Number</th>
        //             <th>Technical Review Date</th>
        //             <th>Status</th>
        //         </thead>
        //         <tbody>{vehicles?.map(vehicle => <tr>
        //             <td>{vehicle.vehicle_id}</td>
        //             <td>{vehicle.brand}</td>
        //             <td>{vehicle.model}</td>
        //             <td>{vehicle.registration_number}</td>
        //             <td>{new Date(vehicle.technical_review_date).toISOString().substring(0, 10)}</td>
        //             <td>{vehicle.status.replace(/_/g, ' ')}</td>
        //         </tr>)}</tbody>
        //     </table>
        // </div >

        <div className='worker_vehicles_page page_content'>
            <h2>Vehicles</h2>
            <Table data={vehicles} keys={"vehicle_id"}
                columns={[
                    { key: 'vehicle_id', label: 'Vehicle ID' },
                    { key: 'brand', label: 'Brand' },
                    { key: 'model', label: 'Model' },
                    { key: 'registration_number', label: 'Registration Number' },
                    { key: 'technical_review_date', label: 'Technical Review Date', type: 'date', format: 'dd/MM/yyyy' },
                    { key: 'status', label: 'Status', type: 'text' }
                ]}

            />
        </div>
    )
}