import '../styles/VehiclesPage.css'


import React, { useState, useEffect } from 'react'

export function VehicleCardLineForm({ name, value }) {
    return (
        <div>
            <span className='vehicle_card_line_name'>{name}: </span>
            <span className='vehicle_card_line_value'>{value}</span>
        </div>
    )
}



export function VehicleCardForm(props) {
    const vehicle = props.vehicle
    const [additionalEquipment, setAdditionalEquipment] = useState(vehicle?.additional_equipment ? vehicle.additional_equipment : [])
    const [description, setDescription] = useState(vehicle?.description ? vehicle.description : "")
    const [registrationNumber, setRegistrationNumber] = useState(vehicle?.registration_number ? vehicle.registration_number : "")
    const [status, setStatus] = useState(vehicle?.status ? vehicle.status : "avaliable")
    const [technicalReviewDate, setTechnicalReviewDate] = useState(vehicle?.technical_review_date ? vehicle.technical_review_date : "")
    const [techDate, setTechDate] = useState(new Date(technicalReviewDate).toISOString().substring(0, 10))
    const [color, setColor] = useState(vehicle?.color ? vehicle.color : "")
    const [image, setImage] = useState(vehicle?.image ? vehicle.image : "")
    const [editSuccess, setEditSuccess] = useState(false)
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

    const techDateTime = new Date(`${techDate}T${"12:00:00"}`)
    async function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting form', { additionalEquipment, description, registrationNumber, status, techDateTime, color, image })
        const response = await fetch('/api/vehicles/' + vehicle.vehicle_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "additional_equipment": additionalEquipment, description, "registration_number": registrationNumber, status, "technical_review_date": techDate, color, image }),
        })
        const body = await response.json()
        console.log('response', body)

        if (!response.ok) {
            console.log('Edition failed')
            console.log(body)
            setError(body.description)
            return
        }

        if (body['vehicle_id']) {
            console.log('Edition success', body)
            setRegisterSuccess(true)
        }
    }

    if (editSuccess) {
        return (
            <div className='edit_success'>
                <h1>Edit Success</h1>
                <p>You can now
                    <Link to={'/vehicles'}> go here </Link>
                </p>
            </div>
        )
    }


    const img = new Image();
    img.src = image;

    return (
        <div className='vehicle_edition_page'>
            <h1>Edit</h1>
            <form className='reg_form' onSubmit={handleSubmit}>
                <div className='form_group'>
                    <p className='errorMessage'>{error}</p>
                </div>
                <div className='form_group'>
                    <label htmlFor='image2'>Image</label>
                    <img src={`data:image/jpg;base64,${image}`} alt='Image' onClick={handleImageClick} />
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
                        <option value="out_of_commision">Out of commision</option>
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
                    <button type='submit'>Edit</button>
                </div>
            </form>
        </div>
    )
}
