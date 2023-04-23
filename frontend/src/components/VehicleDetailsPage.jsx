import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/vehiclesPage.css'
import { VehicleCard } from './VehicleCard';

export function VehicleDetailsPage() {
    const location = useLocation();

    const vehicle = location.state?.vehicle;

    const vehicles = location.state?.vehicles;
    const startDate = location.state?.startDate;
    const startTime = location.state?.startTime;
    const endDate = location.state?.endDate;
    const endTime = location.state?.endTime;
    history.pushState({ startDate, startTime, endDate, endTime, vehicles }, '', '/vehicles')

    return (
        <div className='vehicle'>
            <VehicleCard vehicle={vehicle} extra={true} />
        </div>
    )
}
