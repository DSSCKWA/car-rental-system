import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/vehiclesPage.css'
import { VehicleCard, VehicleCardLine } from './VehicleCard';

export function VehicleDetailsPage() {
    const [rentalCost, setRentalCost] = useState('')
    const location = useLocation();

    const currency = "¥"
    const vehicle = location.state?.vehicle;

    const vehicles = location.state?.vehicles;
    const startDate = location.state?.startDate;
    const startTime = location.state?.startTime;
    const endDate = location.state?.endDate;
    const endTime = location.state?.endTime;
    history.pushState({ startDate, startTime, endDate, endTime, vehicles }, '', '/vehicles')

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const timeDifferenceMs = endDateTime - startDateTime;
    const totalHours = timeDifferenceMs / (1000 * 60 * 60);

    function formatCost(cost) {
        let costStr = cost.toString();
        costStr = costStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return costStr + currency;
    }

    useEffect(() => {
        fetch(
            `/api/price-lists/?` + new URLSearchParams({
                vehicleClass: `${vehicle.vehicle_class}`,
            })
            , { method: 'GET' }
        )
            .then(response => response.json())
            .then(data => setRentalCost(data[0].price))
    }, [])

    return (
        <div className='vehicle'>
            <VehicleCard vehicle={vehicle} extra={true} />
            <div className='rental_cost'>
                <VehicleCardLine name={"Rental cost"} value={`${rentalCost}${currency}/h`} />
                <VehicleCardLine name={"Total cost"} value={formatCost(rentalCost * totalHours)} />
            </div>
        </div>
    )
}
