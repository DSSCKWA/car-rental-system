import React, { useEffect, useState } from 'react'
import { Table } from '../../page_elements/Table.jsx'
import { useNavigate } from 'react-router-dom'

export function AdminEditUsersPage() {

    const [users, setUsers] = useState(null)
    const navigate = useNavigate()

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

    function onChangePermissions(row, e) {
        changeUserPermissions(row.user_id, e.target.value)
    }

    function onClickEditUser(row) {
        navigate(`/admin/edit-users/${row.user_id}`)
    }

    if (!users) return <div>Loading...</div>

    return (
        <div className='admin_edit_users_page page_content'>
            <h2>Edit Users</h2>
            <Table data={users} keys={'user_id'} columns={[
                { label: 'ID', key: 'user_id', type: 'text' },
                { label: 'Email', key: 'user_email_address', type: 'text' },
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'Surname', key: 'surname', type: 'text' },
                { label: 'Permissions', key: 'permissions', type: 'select', options: ['client', 'worker', 'manager', 'admin'], onChange: onChangePermissions },
                { label: 'Status', key: 'account_status', type: 'text' },
                { label: 'Phone number', key: 'phone_number', type: 'text' },
                { label: 'Birth date', key: 'date_of_birth', type: 'date', format: 'dd/MM/yyyy' },
                { label: 'Edit', key: 'actions', type: 'button', onClick: onClickEditUser },
            ]}
            />
        </div>
    )
}
