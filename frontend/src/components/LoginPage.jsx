import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('submitting form', { email, password })
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(email + ':' + password),
            },
            body: JSON.stringify({ }),
        })
        if (!response.ok) {
            console.log('login failed')
            return
        }
        const body = await response.json()
        console.log('response', body)

        switch (body.permissions) {
            case 'admin':
                navigate('/admin')
                break
            case 'manager':
                navigate('/manager')
                break
            case 'worker':
                navigate('/worker')
                break
            case 'client':
                navigate('/client')
                break
            default:
                console.log('no permissions')
                // TODO: add error message
        }
    }

    return (
        <div className='login_page'>
            <h1>Login</h1>
            <form className='log_form' onSubmit={handleSubmit}>
                <div className='form_group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}
