import React, { useEffect, useState } from 'react'

export function AdminEditUsersPage() {

    const [users, setUsers] = useState(null)

    useEffect(() => {
        get_users()
    }, [])

    function get_users() {
        fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.sort((a, b) => a.user_id - b.user_id)
                setUsers(data)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }

    async function changeUserPermissions(id, permissions) {
        await fetch(`/api/users/change-permissions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ permissions }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log('Error changing user permissions', error)
                window.alert('Error changing user permissions')
            })
        get_users()
    }

    return (
        <div className='admin_edit_users_page page_content'>
            <h2>Edit Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Permissions</th>
                        <th>Status</th>
                        <th>Phone number</th>
                        <th>Birth date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody> {users?.map(user => <tr>
                    <td>{user.user_id}</td>
                    <td>{user.user_email_address}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>
                        <select name='permissions' value={user.permissions} onChange={e => {
                            console.log(e.target.value)
                            changeUserPermissions(user.user_id, e.target.value)
                        }}>
                            <option value='admin'>admin</option>
                            <option value='manager'>manager</option>
                            <option value='worker'>worker</option>
                            <option value='client'>client</option>
                        </select>
                    </td>
                    <td>{user.account_status}</td>
                    <td>{user.phone_number}</td>
                    <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                    <td>
                        <button>Edit</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
