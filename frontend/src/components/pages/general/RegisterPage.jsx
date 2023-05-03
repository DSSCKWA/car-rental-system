import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '../../page_elements/Form.jsx'

export function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [surname, setSurname] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting form', { email, password, confirmPassword, name, phone, surname, dateOfBirth })
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'user_email_address': email, password, confirmPassword, name, 'phone_number': phone, surname, 'date_of_birth': dateOfBirth }),
        })
        const body = await response.json()
        console.log('response', body)

        if (!response.ok) {
            console.log('register failed')
            setError(body.description)
            return
        }

        if (body['user_id']) {
            console.log('register success', body)
            setRegisterSuccess(true)
        }
    }

    if (registerSuccess) {
        return (
            <div className='register_success'>
                <h2>Register Success</h2>
                <p>You can now
                    <Link to={'/login'}> login </Link>
                </p>
            </div>
        )
    }

    return (
        <div className='register_page'>
            <Form formName='Register' className='big' onSubmit={handleSubmit} submitText='Register' error={error} inputs={[
                { name: 'email', label: 'Email', type: 'email', onChange: e => setEmail(e.target.value) },
                { name: 'password', label: 'Password', type: 'password', onChange: e => setPassword(e.target.value) },
                { name: 'confirmPassword', label: 'Confirm Password', type: 'password', onChange: e => setConfirmPassword(e.target.value) },
                { name: 'name', label: 'Name', type: 'text', onChange: e => setName(e.target.value) },
                { name: 'surname', label: 'Surname', type: 'text', onChange: e => setSurname(e.target.value) },
                { name: 'phone', label: 'Phone', type: 'text', onChange: e => setPhone(e.target.value) },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', onChange: e => setDateOfBirth(e.target.value) },
            ]} />
        </div>
    )
}
