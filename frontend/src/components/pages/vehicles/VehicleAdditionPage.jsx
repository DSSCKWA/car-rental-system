import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './VehiclesPage.css'
import { VehicleCardCool } from './VehicleCardCool.jsx'


export function VehicleAdditionPage(props) {
    const [submitSuccess] = useState(false)
    const location = useLocation()
    const vehicle = location.state?.vehicle
    const vehicles = location.state?.vehicles
    const startDate = location.state?.startDate
    const startTime = location.state?.startTime
    const endDate = location.state?.endDate
    const endTime = location.state?.endTime
    history.pushState({ startDate, startTime, endDate, endTime, vehicles }, '', '/vehicles')

    if (submitSuccess) {
        return (
            <div className='register_success'>
                <h2>Rental Success</h2>
                <p>You can track your rental in the
                    <Link to={'/client/rentals'}> History </Link> tab
                </p>
            </div>
        )
    }

    return (

        <div className='vehicle'>
            <VehicleCardCool vehicle={vehicle} extra={true} />
        </div>
    )

}
