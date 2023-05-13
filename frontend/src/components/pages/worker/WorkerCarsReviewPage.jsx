import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form } from '../../page_elements/Form.jsx'

export function WorkerCarsReviewPage() {
    const location = useLocation()
    const rental_id = location.state?.rental_id
    const [fuelLevel, setFuelLevel] = useState('full')
    const [vehicleBodyCondition, setVehicleBodyCondition] = useState(false)
    const [otherMechanicalDamage, setOtherMechanicalDamage] = useState('none')
    const [interiorCleanness, setInteriorCleanness] = useState(false)
    const [exteriorCleanness, setExteriorCleanness] = useState(false)
    const [reviewSuccess, setReviewSuccess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        console.log({
            "fuel_level": fuelLevel,
            "vehicle_body_condition": vehicleBodyCondition,
            "other_mechanical_damage": otherMechanicalDamage,
            "interior_cleanness": interiorCleanness,
            "exterior_cleanness": exteriorCleanness
        })
        const response = await fetch(`/api/rentals/${rental_id}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fuel_level": fuelLevel,
                "vehicle_body_condition": vehicleBodyCondition,
                "other_mechanical_damage": otherMechanicalDamage,
                "interior_cleanness": interiorCleanness,
                "exterior_cleanness": exteriorCleanness
            }),
        })
        const body = await response.json()

        if (!response.ok) {
            setError(body.description)
            return
        }

        setReviewSuccess(true)
    }

    if (reviewSuccess) {
        return (
            <div className='car_review_success'>
                <h2>Car reviewed successfully</h2>
                <p>You can now
                    <Link to={'/worker/tasks'}> go back</Link>
                </p>
            </div>
        )
    }

    return (
        <Form formName='Review vehicle after rental' className='big' submitText='Review' onSubmit={handleSubmit} error={error} inputs={[
            {
                name: 'fuelLevel', label: 'Fuel Level', type: 'select', options: [
                    { value: "full", label: "Full" },
                    { value: "depleted", label: "Depleted" },
                    { value: "empty", label: "Empty" },
                ], onChange: e => setFuelLevel(e.target.value)
            },
            { name: 'vehicleBodyCondition', label: 'Vehicle Body Damaged', type: 'checkbox', onChange: e => setVehicleBodyCondition(e.target.checked) },
            {
                name: 'otherMechanicalDamage', label: 'Mechanical Damage', type: 'select', options: [
                    { value: "none", label: "None" },
                    { value: "minor", label: "Minor" },
                    { value: "major", label: "Major" },
                ], onChange: e => setOtherMechanicalDamage(e.target.value)
            },
            { name: 'interiorCleanness', label: 'Interior Clean', type: 'checkbox', onChange: e => setInteriorCleanness(e.target.checked) },
            { name: 'exteriorCleanness', label: 'Exterior Clean', type: 'checkbox', onChange: e => setExteriorCleanness(e.target.checked) },
        ]} />
    )
}
