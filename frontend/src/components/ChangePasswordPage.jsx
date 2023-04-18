import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ChangePasswordStyles.css'

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
            <h2>Change Password</h2>
            <form className='change_password_form small' onSubmit={handleSubmit}>
                <div className='form_group'>
                    <p className='errorMessage'>{error}</p>
                </div>
                <div className='form_group'>
                    <label htmlFor='current_password'>Current Password</label>
                    <input type='password' id='current_password' name='current_password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='new_password'>New Password</label>
                    <input type='password' id='new_password' name='new_password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='confirm_new_password'>Confirm New Password</label>
                    <input type='password' id='confirm_new_password' name='confirm_new_password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                </div>
                <div className='form_group'>
                    <button type='submit'>Change Password</button>
                </div>
            </form>
        </div>
    )
}
