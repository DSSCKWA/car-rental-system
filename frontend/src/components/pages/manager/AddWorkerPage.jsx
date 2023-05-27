import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '../../page_elements/Form.jsx'

export function AddWorkerPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [surname, setSurname] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [addWorkerSuccess, setAddWorkerSuccess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting form', { email, password, confirmPassword, name, phone, surname, dateOfBirth })
        const response = await fetch('/api/worker/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                'user_email_address': email,
                password,
                confirmPassword,
                name,
                'phone_number': phone,
                surname,
                'date_of_birth': dateOfBirth,
            }),
        })
        const body = await response.json()
        console.log('response', body)

        if (!response.ok) {
            console.log('add worker failed')
            setError(body.description)
            return
        }

        if (body['user_id']) {
            console.log('add worker success', body)
            setAddWorkerSuccess(true)
        }
    }

    if (addWorkerSuccess) {
        return <div><h2>Worker added successfully</h2><p><Link to='/manager/workers'>Go back</Link></p></div>
    }

    return <div className='add_worker_page page_content'>
        <Form formName='Add worker' className='big' submitText='Add worker' onSubmit={handleSubmit} error={error} inputs={[
            { name: 'email', label: 'Email', type: 'email', onChange: e => setEmail(e.target.value) },
            { name: 'password', label: 'Password', type: 'password', onChange: e => setPassword(e.target.value) },
            { name: 'confirmPassword', label: 'Confirm Password', type: 'password', onChange: e => setConfirmPassword(e.target.value) },
            { name: 'name', label: 'Name', type: 'text', onChange: e => setName(e.target.value) },
            { name: 'surname', label: 'Surname', type: 'text', onChange: e => setSurname(e.target.value) },
            { name: 'phone', label: 'Phone', type: 'text', onChange: e => setPhone(e.target.value) },
            { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', onChange: e => setDateOfBirth(e.target.value) },
        ]} />
    </div>
}
