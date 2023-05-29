import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../page_elements/Table.jsx'

export function WorkerCarsPage() {
    const navigate = useNavigate()
    const [vehicles, setVehicles] = useState([])
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
                data.sort((a, b) => a.vehicle_id - b.vehicle_id)
                setVehicles(data)
            })
            .catch(error => {
                console.log('Error getting vehicle info', error)
            })
    }

    return (
        <div className='worker_vehicles_page page_content'>
            <h2>Vehicles</h2>
            <Table data={vehicles} keys={'vehicle_id'}
                columns={[
                    { key: 'vehicle_id', label: 'Vehicle ID' },
                    { key: 'brand', label: 'Brand' },
                    { key: 'model', label: 'Model' },
                    { key: 'registration_number', label: 'Registration Number' },
                    { key: 'technical_review_date', label: 'Technical Review Date', type: 'date', format: 'dd/MM/yyyy' },
                    { key: 'status', label: 'Status', type: 'text' },
                ]}

            />
        </div>
    )
}
