import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './VehiclesPage.css'
import { VehicleCardCool, VehicleCardLineForm } from './VehicleCardCool.jsx'


export function VehicleAdditionPage(props) {
    const [rentalCost, setRentalCost] = useState(0)
    const [policyCost, setPolicyCost] = useState(0)
    const [policyType, setPolicyType] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [error, setError] = useState('')
    const location = useLocation()


    const currency = '¥'
    const vehicle = location.state?.vehicle

    const { user } = props
    const vehicles = location.state?.vehicles
    const startDate = location.state?.startDate
    const startTime = location.state?.startTime
    const endDate = location.state?.endDate
    const endTime = location.state?.endTime
    history.pushState({ startDate, startTime, endDate, endTime, vehicles }, '', '/vehicles')

    const startDateTime = new Date(`${startDate}T${startTime}`)
    const endDateTime = new Date(`${endDate}T${endTime}`)
    const timeDifferenceMs = endDateTime - startDateTime
    const totalHours = timeDifferenceMs / (1000 * 60 * 60)
    const totalDays = Math.ceil(totalHours / 24)

    const fetchPolicy = async () => {
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
                throw new Error(`Error fetching policies: ${response.statusText}`)
            }
            const data = await response.json()
            setPolicies(data)

        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    function formatCost(cost) {
        let costStr = cost.toString()
        costStr = costStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        return costStr + currency
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        let policy_number = null
        if (!(policyType == null) && !(policyType == 'none')) {
            const policyResponse = await fetch('/api/insurances/' + policyType, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const policyBody = await policyResponse.json()
            if (!policyResponse.ok) {
                console.log('policy fetch failed')
                setError(policyBody.description)
                return
            }

            policy_number = policyBody[0].policy_number

        }

        console.log('submitting form', `${vehicle.vehicle_id}`, startTime, endTime, `${user.user_id}`)
        const rentalResponse = await fetch('/api/rentals/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'vehicle_id': vehicle.vehicle_id, 'start_time': startDateTime, 'end_time': endDateTime, 'discount_code_id': null, 'client_id': user.user_id, 'policy_number': policy_number }),
        })
        const rentalBody = await rentalResponse.json()
        console.log('response', rentalBody)


        if (!rentalResponse.ok) {
            console.log('rental failed')
            setError(rentalBody.description)
            return
        }

        const costsResponse = await fetch('/api/costs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'rental_id': rentalBody.rental_id, 'vehicle_cost': parseInt(rentalCost * totalHours), 'item_cost': null, 'insurance_cost': policyCost, 'penalty_charges': null }),
        })
        const costsBody = await costsResponse.json()
        console.log('response', costsBody)
        if (!costsResponse.ok) {
            console.log('cost table setting failed')
            setError(costsBody.description)
            return
        }

        if (rentalBody['rental_id']) {
            console.log('rental success', rentalBody)
            setSubmitSuccess(true)
        }
    }

    if (submitSuccess) {
        return (
            <div className='register_success'>
                <h2>Rental Success</h2>
                <p>You can track your rental in the
                    <Link to={'/client'}> History </Link> tab
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
