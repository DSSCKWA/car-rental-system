import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../page_elements/Form.jsx'

export function LoginPage(props) {
    const { user, setUser } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

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

        const body = await response.json()
        console.log('response', body)

        if (!response.ok) {
            console.log('login failed')
            setError(body.description)
            return
        }

        setUser(body)

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
                navigate('/')
        }
    }

    return (
        <div className='login_page'>
            <Form formName='Login' className='small' onSubmit={handleSubmit} submitText='Login' inputs={[
                { name: 'email', label: 'Email', type: 'email', onChange: e => setEmail(e.target.value) },
                { name: 'password', label: 'Password', type: 'password', onChange: e => setPassword(e.target.value) },
            ]} error={error} />
        </div>
    )
}
