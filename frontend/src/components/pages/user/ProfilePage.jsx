import { Link } from 'react-router-dom'
import './ProfileStyles.css'

export function ProfilePage(props) {
    const { user } = props

    return (
        <div className='profile_page'>
            <div className='profile page_content column_layout'>
                <div className='profile_info'>
                    <h2>User Info</h2>
                    <div className='user_info'>
                        <p>Email Address: {user?.user_email_address}</p>
                        <p>Name: {user?.name}</p>
                        <p>Surname: {user?.surname}</p>
                        <p>Permissions: {user?.permissions}</p>
                        <p>Phone Number: {user?.phone_number}</p>
                        <p>Date of Birth: {new Date(user?.date_of_birth).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className='profile_actions'>
                    <h2>Actions</h2>
                    <Link to='/profile/change-password' className='link_button_style'>Change password</Link>
                </div>
            </div>
        </div>
    )
}
