import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ChangePasswordStyles.css'
import { Form } from '../../page_elements/Form.jsx'

export function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('/api/users/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
        })
        const body = await response.json()

        if (!response.ok) {
            setError(body.description)
            return
        }

        setPasswordChangeSuccess(true)
    }

    if (passwordChangeSuccess) {
        return (
            <div className='change_password_success'>
                <h2>Password Changed Successfully</h2>
                <Link to={'/profile'}>Go back</Link>
            </div >
        )
    }

    return (
        <div className='change_password_page'>
            <Form formName='Change password' className='small' onSubmit={handleSubmit} submitText='Change password' error={error} inputs={[
                { name: 'currentPassword', label: 'Password', type: 'password', onChange: e => setCurrentPassword(e.target.value) },
                { name: 'newPassword', label: 'New password', type: 'password', onChange: e => setNewPassword(e.target.value) },
                { name: 'confirmNewPassword', label: 'Confirm new password', type: 'password', onChange: e => setConfirmNewPassword(e.target.value) },
            ]} />
        </div>
    )
}
