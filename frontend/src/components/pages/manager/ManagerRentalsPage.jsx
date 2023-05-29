import { useEffect, useState } from 'react'
import { Table } from '../../page_elements/Table.jsx'

export function ManagerRentalsPage() {

    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('00:00:00')
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('00:00:00')
    const [rentals, setRentals] = useState("[]")

    useEffect(() => {
        fetchRentals()
    }, [])

    const fetchRentals = async () => {
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
                '/api/rentals/' + params
                , { method: 'GET' },
            )
                .then(response => response.json())
                .then(data => {
                    data.sort((a, b) => a.rental_id - b.rental_id)
                    for (let rental of data) {
                        rental.start_time = formatDate(rental.start_time)
                        rental.end_time = formatDate(rental.end_time)
                    }
                    setRentals(data)
                })
                .catch(error => {
                    console.log('Error getting rental info', error)
                })

            console.log(rentals)

        } catch (error) {
            console.error('Error fetching rentals:', error)
        }

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

    if (!rentals) return <div>Loading...</div>

    return (
        <div>
            <form className='rental_time_search_from' onSubmit={e => {
                e.preventDefault()
                if (startDate && startTime && endDate && endTime) {
                    fetchRentals()
                } else {
                    alert('Pick a date range first!')
                }
            }}>
                <div className='form_group'>
                    <label htmlFor='start_date'>Start date</label>
                    <input type='date' id='start_date' name='start_date' value={startDate}
                        onChange={e => {
                            setStartDate(e.target.value);
                        }} />
                </div>
                <div className='form_group'>
                    <label htmlFor='start_time'>Start time</label>
                    <input type='time' id='start_time' name='start_time' step='3600' value={startTime}
                        onChange={e => {
                            setStartTime(`${e.target.value.split(':')[0]}:00:00`)
                        }} />
                </div>
                <div className='form_group'>
                    <label htmlFor='end_date'>End date</label>
                    <input type='date' id='end_date' name='end_date' value={endDate}
                        min={startDate ? startDate : startDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='end_time'>End time</label>
                    <input type='time' id='end_time' name='end_time' step='3600' value={endTime} onChange={e => {
                        setEndTime(`${e.target.value.split(':')[0]}:00:00`)
                    }} />
                </div>
                <div className='form_group'>
                    <button type='submit'>Search</button>
                </div>
            </form>
            <div className='manager_rentals_page page_content'>
                <h2>Rentals</h2>
                <Table data={rentals} keys={'rental_id'} columns={[
                    { label: 'Name', key: 'name', type: 'text' },
                    { label: 'Surname', key: 'surname', type: 'text' },
                    { label: 'Email', key: 'user_email_address', type: 'text' },
                    { label: 'Phone number', key: 'phone_number', type: 'text' },
                    { label: 'Brand', key: 'brand', type: 'text' },
                    { label: 'Model', key: 'model', type: 'text' },
                    { label: 'Registration number', key: 'registration_number', type: 'text' },
                    { label: 'Start time', key: 'start_time', type: 'text' },
                    { label: 'End time', key: 'end_time', type: 'text' },
                    { label: 'Status', key: 'rental_status', type: 'text' },
                    { label: 'Policy', key: 'policy_name', type: 'text' },
                    { label: 'Total cost', key: 'total_cost', type: 'text' }
                ]} />
            </div >
        </div>
    )
}
