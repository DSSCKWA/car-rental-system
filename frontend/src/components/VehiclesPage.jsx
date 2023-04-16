import React, { useState, useEffect } from 'react'
import '../styles/VehiclesPage.css'

export function VehiclesPage() {
    const [vehicles, setVehicles] = useState([])
    const [sortType, setSortType] = useState('none')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('/api/vehicles/', { method: 'GET' })

                if (!response.ok) {
                    throw new Error(`Error fetching vehicles: ${response.statusText}`)
                }

                const data = await response.json()
                setVehicles(data)
            } catch (error) {
                console.error('Error fetching vehicles:', error)
            }
        }

        fetchVehicles()
    }, [])

    useEffect(() => {
        const sortVehicles = (a, b) => {
            if (sortType === 'year_asc') return a.year_of_production - b.year_of_production
            if (sortType === 'year_desc') return b.year_of_production - a.year_of_production
            return 0
        }

        setVehicles(vehicles => [...vehicles].sort(sortVehicles))
    }, [sortType])

    const filteredVehicles = vehicles.filter(vehicle =>
        `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(filter.toLowerCase()),
    )

    return (
        <div className = 'Vehicles'>
            <div className='vehicle-filter-sort'>
                <input
                    className='vehicle-filter'
                    type='text'
                    placeholder='Filter by brand or model'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                <select className='vehicle-sort' value={sortType} onChange={e => setSortType(e.target.value)}>
                    <option value='none'>Sort by year of production</option>
                    <option value='year_asc'>Oldest</option>
                    <option value='year_desc'>Newest</option>
                </select>
            </div>
            <div className='vehicle-list'>
                {filteredVehicles.map(vehicle =>
                    vehicle.status === 'available' ?
                        <div key={vehicle.vehicle_id} className='vehicle-card'>
                            <img src={`data:image/jpeg;base64,${vehicle.image}`} alt={`${vehicle.brand} ${vehicle.model}`} />
                            <div className='vehicle-details'>
                                <h3>{vehicle.brand} {vehicle.model}</h3>
                                <p><b>Year of production: </b> {vehicle.year_of_production}</p>
                                <p><b>Body type:</b> {vehicle.body_type}</p>
                                <p><b>Status: </b> {vehicle.status}</p>
                                <p><b>Engine power:</b> {vehicle.engine_power} KM</p>
                                <p><b>Fuel type: </b> {vehicle.fuel_type}</p>
                            </div>
                        </div>
                        : null,
                )}
            </div>
        </div>
    )
}
