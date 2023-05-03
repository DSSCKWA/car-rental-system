import '../styles/VehiclesPage.css'
import Resizer from "react-image-file-resizer";

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

export function VehicleCardLineForm({ name, value }) {
    return (
        <div>
            <span className='vehicle_card_line_name'>{name}: </span>
            <span className='vehicle_card_line_value'>{value}</span>
        </div>
    )
}

export function VehicleCardFormFull(props) {
    const vehicle = props.vehicle
    const [brand, setBrand] = useState(vehicle?.brand ? vehicle.brand : "")
    const [model, setModel] = useState(vehicle?.model ? vehicle.model : "")
    const [yearOfProduction, setYearOfProduction] = useState(vehicle?.year_of_production ? vehicle.year_of_production : "")
    const [bodyType, setBodyType] = useState(vehicle?.body_type ? vehicle.body_type : "sedan")
    const [numberOfSeats, setNumberOfSeats] = useState(vehicle?.number_of_seats ? vehicle.number_of_seats : "")
    const [vehicleClass, setVehicleClass] = useState(vehicle?.vehicle_class ? vehicle.vehicle_class : "S")
    const [numberOfDoors, setNumberOfDoors] = useState(vehicle?.number_of_doors ? vehicle.number_of_doors : "")
    const [driveType, setDriveType] = useState(vehicle?.drive_type ? vehicle.drive_type : "FWD")
    const [enginePower, setEnginePower] = useState(vehicle?.engine_power ? vehicle.engine_power : "")
    const [engineCapacity, setEngineCapacity] = useState(vehicle?.engine_capacity ? vehicle.engine_capacity : "")
    const [fuelType, setFuelType] = useState(vehicle?.fuel_type ? vehicle.fuel_type : "petrol")
    const [tankCapacity, setTankCapacity] = useState(vehicle?.tank_capacity ? vehicle.tank_capacity : "")
    const [gearboxType, setGearboxType] = useState(vehicle?.gearbox_type ? vehicle.gearbox_type : "automatic")
    const [additionalEquipment, setAdditionalEquipment] = useState(vehicle?.additional_equipment ? vehicle.additional_equipment : [])
    const [description, setDescription] = useState(vehicle?.description ? vehicle.description : "")
    const [registrationNumber, setRegistrationNumber] = useState(vehicle?.registration_number ? vehicle.registration_number : "")
    const [status, setStatus] = useState(vehicle?.status ? vehicle.status : "available")
    const [technicalReviewDate, setTechnicalReviewDate] = useState(vehicle?.technical_review_date ? vehicle.technical_review_date : "01/01/2024 12:00:00")
    const [techDate, setTechDate] = useState(new Date(technicalReviewDate).toISOString().substring(0, 10))
    const [color, setColor] = useState(vehicle?.color ? vehicle.color : "")
    const [image, setImage] = useState(vehicle?.image ? vehicle.image : null)
    const [addSuccess, setAddSuccess] = useState(false)
    const [error, setError] = useState('')
    const getMinDate = () => {
        return new Date().toISOString().substring(0, 10)
    }

    const extra = props.extra



    const handleImageClick = () => {
        document.getElementById('image-file').click();
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        const techDateTime = new Date(`${techDate}T${"12:00:00"}`)
        console.log('submitting form', { yearOfProduction, bodyType, numberOfSeats, vehicleClass, numberOfDoors, driveType, enginePower, engineCapacity, fuelType, tankCapacity, additionalEquipment, description, registrationNumber, status, techDate, color, image, gearboxType })
        const response = await fetch('/api/vehicles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                brand,
                model,
                'year_of_production': yearOfProduction,
                'body_type': bodyType,
                'number_of_seats': numberOfSeats,
                'vehicle_class': vehicleClass,
                'number_of_doors': numberOfDoors,
                'drive_type': driveType,
                'engine_power': enginePower,
                'engine_capacity': engineCapacity,
                'fuel_type': fuelType,
                'tank_capacity': tankCapacity,
                'additional_equipment': additionalEquipment,
                description,
                'registration_number': registrationNumber,
                status,
                'technical_review_date': techDate,
                color,
                image,
                'gearbox_type': gearboxType
            }),
        })
        const body = await response.json()
        console.log('response', body)

        if (!response.ok) {
            console.log('Addition failed')
            setError(body.description)
            return
        }

        if (body['vehicle_id']) {
            console.log('Addition success', body)
            setAddSuccess(true)
        }
    }

    if (addSuccess) {
        return (
            <div className='add_success'>
                <h1>Addition Success</h1>
                <p>You can now
                    <Link to={'/vehicles'}> go here </Link>
                </p>
            </div>
        )
    }



    return (
        <div className='vehicle_addition_page'>
            <h1>Add</h1>
            <form className='reg_form' onSubmit={handleSubmit}>
                <div className='form_group'>
                    <p className='errorMessage'>{error}</p>
                </div>
                <div className='form_group'>
                    <label htmlFor='image'>Image</label>
                    <img src={image ? `data:image/jpg;base64,${image}` : `../src/assets/placeholder.png`} alt='Image' onClick={handleImageClick} />
                    <input
                        type='file'
                        id='image-file'
                        name='image'
                        accept='image/*'
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor='brand'>Brand</label>
                    <input type='text' id='brand' name='brand' value={brand} onChange={e => setBrand(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='model'>Model</label>
                    <input type='text' id='model' name='model' value={model} onChange={e => setModel(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='year_of_production'>Year of Production</label>
                    <input type='text' id='year_of_production' name='year_of_production' value={yearOfProduction} onChange={e => setYearOfProduction(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='body_type'>Body Type</label>
                    <select id='body_type' name='body_type' value={bodyType} onChange={e => setBodyType(e.target.value)} >
                        <option value="sedan">Sedan</option>
                        <option value="pickup_truck">Pickup truck</option>
                        <option value="SUV">SUV</option>
                        <option value="coupe">Coupe</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="combi">Combi</option>
                        <option value="convertible">Convertible</option>
                        <option value="MUV">MUV</option>
                        <option value="sports_car">Sports car</option>

                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor='number_of_seats'>Number of Seats</label>
                    <input type='text' id='number_of_seats' name='number_of_seats' value={numberOfSeats} onChange={e => setNumberOfSeats(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='vehicle_class'>Vehicle Class</label>
                    <select id='vehicle_class' name='vehicle_class' value={vehicleClass} onChange={e => setVehicleClass(e.target.value)} >
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="H">H</option>
                        <option value="J">J</option>
                        <option value="M">M</option>
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor='number_of_doors'>Number of Doors</label>
                    <input type='text' id='number_of_doors' name='number_of_doors' value={numberOfDoors} onChange={e => setNumberOfDoors(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='drive_type'>Drive Type</label>
                    <select id='drive_type' name='drive_type' value={driveType} onChange={e => setDriveType(e.target.value)} >
                        <option value="FWD">FWD</option>
                        <option value="RWD">RWD</option>
                        <option value="4WD">4WD</option>
                        <option value="AWD">AWD</option>
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor='engine_power'>Engine Power</label>
                    <input type='text' id='engine_power' name='engine_power' value={enginePower} onChange={e => setEnginePower(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='engine_capacity'>Engine Capacity</label>
                    <input type='text' id='engine_capacity' name='engine_capacity' value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='fuel_type'>Fuel Type</label>
                    <select id='fuel_type' name='fuel_type' value={fuelType} onChange={e => setFuelType(e.target.value)} >
                        <option value="petrol">Petrol</option>
                        <option value="electric">Electric</option>
                        <option value="diesel">Diesel</option>
                        <option value="bio-diesel">Bio-diesel</option>
                        <option value="LPG">LPG</option>
                        <option value="CNG">CNG</option>
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor='tank_capacity'>Tank Capacity</label>
                    <input type='text' id='tank_capacity' name='tank_capacity' value={tankCapacity} onChange={e => setTankCapacity(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='additional_equipment'>Additional Equipment</label>
                    <input type='text' id='additional_equipment' name='additional_equipment' value={additionalEquipment} onChange={e => setAdditionalEquipment(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='registration_number'>Registration Number</label>
                    <input type='text' id='registration_number' name='registration_number' value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='status'>Status</label>
                    <select id='status' name='status' value={status} onChange={e => setStatus(e.target.value)} >
                        <option value="available">Avaliable</option>
                        <option value="rented">Rented</option>
                        <option value="out_of_comission">Out of commision</option>
                        <option value="in_service">In service</option>
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor='technical_review_date'>Technical Review Date</label>
                    <input type='date' id='technical_review_date' name='technical_review_date' value={techDate} min={technicalReviewDate ? techDate : getMinDate()} onChange={e => setTechDate(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='color'>Color</label>
                    <input type='text' id='color' name='color' value={color} onChange={e => setColor(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='gearbox_type'>Gearbox Type</label>
                    <select id='gearbox_type' name='gearbox_type' value={gearboxType} onChange={e => setGearboxType(e.target.value)} >
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                    </select>
                </div>
                <div className='form_group'>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}
