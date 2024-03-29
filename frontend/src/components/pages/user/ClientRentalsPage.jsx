import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import React from 'react'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { modalStyle } from '../../../styles.jsx'


export function ClientRentalsPage() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(2)
    const [comment, setComment] = React.useState('')
    const [rentalId, setRentalId] = React.useState()
    const [experienceValue, setExperienceValue] = React.useState(2)
    const navigate = useNavigate()
    const [rentals, setRentals] = useState(null)

    useEffect(() => {
        get_rentals()
    }, [])


    function get_rentals() {
        fetch('/api/rentals/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data = data.sort((a, b) => a.rental_id - b.rental_id)
                setRentals(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    async function changeStatus(rental_id, status, client_id, start_time) {
        await fetch(`/api/rentals/${rental_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: client_id,
                rental_status: status,
                start_time: formatDate(start_time),
            }),
        })
            .catch(error => {
                console.log('Error changing rental status', error)
            })
        get_rentals()
    }


    function formatDate(dateString) {
        const date = new Date(dateString)
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return date.toLocaleString('en-GB', options)
    }

    function openRatingModal(rental_id) {
        setOpen(true)
        setRentalId(rental_id)
    }

    function closeRatingModal() {
        setOpen(false)
        setRentalId(null)
    }

    function saveRatingModal() {
        const vehicle_rating = value
        const service_rating = experienceValue
        const rental_id = rentalId
        fetch('/api/feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rental_id, vehicle_rating, service_rating, comment }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRentals(rentals.map(rental => {
                    if (rental.rental_id === rental_id) {
                        rental.feedback_status = true
                    }
                    return rental
                }))
                closeRatingModal()
                navigate('/client/rentals')
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    function isMoreThan24Hours(startTime) {
        const currentTime = new Date().getTime()
        const rentalTime = new Date(startTime).getTime()
        return rentalTime - currentTime > 24 * 60 * 60 * 1000
    }

    return (
        <div className='client_rentals_page page_content'>
            <h2>Rentals</h2>
            <table>
                <thead>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Registration number</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Status</th>
                    <th>Policy</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {rentals?.map(rental => {
                        return (
                            <tr key={rental.rental_id}>
                                <td>{rental.brand}</td>
                                <td>{rental.model}</td>
                                <td>{rental.registration_number}</td>
                                <td>{formatDate(rental.start_time)}</td>
                                <td>{formatDate(rental.end_time)}</td>
                                <td>{rental.rental_status.replace(/_/g, ' ')}</td>
                                <td>{rental.policy_name}</td>
                                <td>{rental?.rental_status !== 'completed' ? 'you can rate when your rental ends' :
                                    rental?.rental_status === 'completed' && !rental.feedback_status ?
                                        <button onClick={() => { openRatingModal(rental.rental_id) }}> Rate </button>
                                        : 'Rental already rated'}</td>
                                <td>
                                    {isMoreThan24Hours(rental.start_time) && rental.rental_status === 'upcoming' &&
                                        <button onClick={() => {
                                            changeStatus(rental.rental_id, 'canceled', rental.client_id, rental.start_time)
                                        }}>Cancel
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Modal
                open={open}
                onClose={closeRatingModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={modalStyle}
                >
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        sx={{ marginBottom: '1em', fontWeight: 'bold', fontSize: '1.5em' }}
                    >
                        Rate your rental
                    </Typography>
                    <Typography
                        id='modal-modal-rate-vehicle'
                        variant='h6'
                        component='h2'
                        sx={{ marginBottom: '0.5em' }}
                    >
                        Rate your vehicle
                    </Typography>
                    <Rating
                        name='simple-controlled'
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    />
                    <Typography
                        id='modal-modal-rate-service'
                        variant='h6'
                        component='h2'
                        sx={{ marginTop: '1em', marginBottom: '0.5em' }}
                    >
                        Rate your experience
                    </Typography>
                    <Rating
                        name='simple-controlled'
                        value={experienceValue}
                        onChange={(event, newValue) => {
                            setExperienceValue(newValue)
                        }}
                    />
                    <Typography
                        id='modal-modal-comment'
                        variant='h6'
                        component='h2'
                        sx={{ marginTop: '1em', marginBottom: '0.5em' }}
                    >
                        Leave a comment
                    </Typography>
                    <TextField
                        id='outlined-basic'
                        value={comment}
                        variant='outlined'
                        multiline={true}
                        fullWidth={true}
                        onChange={event => {
                            setComment(event.target.value)
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: 'var(--main-text-color)',
                            },
                        }}
                    />
                    <Button
                        onClick={saveRatingModal}
                        sx={{
                            backgroundColor: '#666',
                            color: 'var(--main-text-color)',
                            '&:hover': { backgroundColor: '#444' },
                            width: '100%',
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
