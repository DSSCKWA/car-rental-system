import { useState } from 'react'
import { Link } from 'react-router-dom'

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
                <h1>Register Success</h1>
                <p>You can now
                    <Link to={'/login'}> login </Link>
                </p>
            </div>
        )
    }

    return (
        <div className='register_page'>
            <h1>Register</h1>
            <form className='reg_form' onSubmit={handleSubmit}>
                <div className='form_group'>
                    <p className='errorMessage'>{error}</p>
                </div>
                <div className='form_group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='surname'>Surname</label>
                    <input type='text' id='surname' name='surname' value={surname} onChange={e => setSurname(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input type='password' id='confirm_password' name='confirm_password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='tel' id='phone' name='phone' value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='date_of_birth'>Date of Birth</label>
                    <input type='date' id='date_of_birth' name='date_of_birth' value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                </div>
                <div className='form_group'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}
