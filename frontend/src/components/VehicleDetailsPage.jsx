import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/vehiclesPage.css'
import { VehicleCard, VehicleCardLine } from './VehicleCard';

export function VehicleDetailsPage() {
    const [rentalCost, setRentalCost] = useState(0)
    const [policies, setPolicies] = useState([])
    const [policyCost, setPolicyCost] = useState(0)
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
    const totalDays = Math.ceil(totalHours / 24);

    function formatCost(cost) {
        let costStr = cost.toString();
        costStr = costStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return costStr + currency;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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

    useEffect(() => {
        fetch(`/api/price-lists/policies`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setPolicies(data))
    }, [])

    return (
        <div className='vehicle'>
            <VehicleCard vehicle={vehicle} extra={true} />
            <label htmlFor="insurance_policy_select" className='insurance_policy_select_label'>Insurance: </label>
            <select className='insurance_policy_select' value={policyCost} onChange={e => setPolicyCost(e.target.value)}>
                <option value={0} key="None">
                    None
                </option>
                {policies.map(policy => (
                    <option value={policy.price * totalDays} key={policy.policy_type}>
                        {capitalizeFirstLetter(policy.policy_type).replace(/_/g, ' ')}
                    </option>
                ))}
            </select>
            <div className='rental_cost'>
                <VehicleCardLine name={"Rental cost"} value={`${rentalCost}${currency}/h`} />
                {policyCost != 0 ? <VehicleCardLine name={"Insurance policy cost"} value={`${policyCost}${currency}`} /> : null}
                <VehicleCardLine name={"Total cost"} value={formatCost(parseInt(rentalCost * totalHours) + parseInt(policyCost))} />
            </div>
        </div>
    )
}
