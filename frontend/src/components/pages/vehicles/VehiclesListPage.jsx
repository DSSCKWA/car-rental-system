import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { VehicleCard } from './VehicleCard.jsx'
import './VehiclesPage.css'
import { VehicleAdditionPage } from './VehicleAdditionPage.jsx'
import { Link } from 'react-router-dom'


export function VehiclesListPage(props) {
    const { user } = props
    const startDateState = history.state?.startDate
    const startTimeState = history.state?.startTime
    const endDateState = history.state?.endDate
    const endTimeState = history.state?.endTime
    const vehiclesState = history.state?.vehicles

    const [vehicles, setVehicles] = useState(vehiclesState ? vehiclesState : [])
    const [sortType, setSortType] = useState('none')
    const [filter, setFilter] = useState('')
    const [startDate, setStartDate] = useState(startDateState ? startDateState : '')
    const [startTime, setStartTime] = useState(startTimeState ? startTimeState : '00:00:00')
    const [endDate, setEndDate] = useState(endDateState ? endDateState : '')
    const [endTime, setEndTime] = useState(endTimeState ? endTimeState : '00:00:00')
    const navigate = useNavigate()
    const getMinDate = () => {
        return new Date().toISOString().substring(0, 10)
    }

    const fetchVehicles = async () => {
        try {
            let params = ''
            if (startDate && startTime && endDate && endTime) {
                params = '?' + new URLSearchParams({
                    startDate: `${startDate}`,
                    startTime: `${startTime}`,
                    endDate: `${endDate}`,
                    endTime: `${endTime}`,
                })
            }

            const response = await fetch(
                '/api/vehicles/' + params
                , { method: 'GET' },
            )


            if (!response.ok) {
                throw new Error(`Error fetching vehicles: ${response.statusText}`)
            }
            const data = await response.json()
            setVehicles(data)

        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    const goToDetailsPage = async vehicle => {
        if (startDate && startTime && endDate && endTime || user?.permissions == 'worker') {
            navigate('/vehicles/details', { state: { vehicle, vehicles, startDate, startTime, endDate, endTime } })
        } else {
            alert('Pick a date range first!')
        }
    }

    useEffect(() => {
        const sortVehicles = (a, b) => {
            if (sortType === 'year_asc') return a.year_of_production - b.year_of_production
            if (sortType === 'year_desc') return b.year_of_production - a.year_of_production
            return 0
        }

        setVehicles(vehicles => [...vehicles].sort(sortVehicles))
    }, [sortType])

    useEffect(() => {
        fetchVehicles()
    }, [])


    const filteredVehicles = vehicles.filter(vehicle =>
        `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(filter.toLowerCase()),
    )


    if (user?.permissions == 'worker') {
        return (
            <div className='Vehicles'>
                <div className='vehicle_add'>
                    <Link to={'/vehicles/new'}> Add new </Link>
                </div>

                {vehicles.length != 0 ? <>
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
                                <div key={vehicle.vehicle_id} className='vehicle-card' onClick={() => { goToDetailsPage(vehicle) }}>
                                    <VehicleCard vehicle={vehicle} extra={false} />
                                </div>
                                : null,
                        )}
                    </div>
                </> : null}

            </div>
        )
    } else {
        return (
            <div className='Vehicles'>
                <form className='vehicle_time_search_from' onSubmit={e => {
                    e.preventDefault()
                    if (startDate && startTime && endDate && endTime) {
                        fetchVehicles()
                    } else {
                        alert('Pick a date range first!')
                    }
                }}>
                    <div className='form_group'>
                        <label htmlFor='start_date'>Start date</label>
                        <input type='date' id='start_date' name='start_date' value={startDate} min={getMinDate()} onChange={e => { setStartDate(e.target.value); location.startDate = e.target.value }} />
                    </div>
                    <div className='form_group'>
                        <label htmlFor='start_time'>Start time</label>
                        <input type='time' id='start_time' name='start_time' step='3600' value={startTime} onChange={e => { setStartTime(`${e.target.value.split(':')[0]}:00:00`) }} />
                    </div>
                    <div className='form_group'>
                        <label htmlFor='end_date'>End date</label>
                        <input type='date' id='end_date' name='end_date' value={endDate} min={startDate ? startDate : getMinDate()} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <div className='form_group'>
                        <label htmlFor='end_time'>End time</label>
                        <input type='time' id='end_time' name='end_time' step='3600' value={endTime} onChange={e => { setEndTime(`${e.target.value.split(':')[0]}:00:00`) }} />
                    </div>
                    <div className='form_group'>
                        <button type='submit'>Search</button>
                    </div>
                </form>
                {vehicles.length != 0 ? <>
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
                                <div key={vehicle.vehicle_id} className='vehicle-card' onClick={() => { goToDetailsPage(vehicle) }}>
                                    <VehicleCard vehicle={vehicle} extra={false} />
                                </div>
                                : null,
                        )}
                    </div>
                </> : null}

            </div>
        )
    }
}
