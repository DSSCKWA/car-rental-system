import { Form } from '../../page_elements/Form.jsx'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


export function AdminEditUserForm() {
    const { id } = useParams()

    const [user, setUser] = useState(null)
    const [name, setName] = useState(user?.name)
    const [surname, setSurname] = useState(user?.surname)
    const [user_email_address, setUser_email_address] = useState(user?.user_email_address)
    const [phone_number, setPhone_number] = useState(user?.phone_number)
    const [date_of_birth, setDateOfBirth] = useState(user?.date_of_birth)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function get_user() {
        await fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setName(data.name)
                setSurname(data.surname)
                setUser_email_address(data.user_email_address)
                setPhone_number(data.phone_number)
                setDateOfBirth(data.date_of_birth)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }

    useEffect(() => {
        get_user()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                name,
                surname,
                user_email_address,
                phone_number,
                date_of_birth,
            }),
        })
        const data = await response.json()
        if (response.status !== 200) {
            setError(data.description ?? 'Server error')
        } else {
            setError('')
            setSuccess(true)
        }
    }

    function convertDate() {
        const date = new Date(date_of_birth)
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        return `${year}-${month}-${day}`
    }

    function getValue(e) {
        return e.target.value
    }

    if (!user) return <div>Loading...</div>

    if (success) return (
        <div>
            <h2>
                User edited successfully
            </h2>
            <p>
                <Link to={'/admin/edit-users'}>
                    Go back to users page
                </Link>
            </p>
        </div>
    )

    return (
        <Form className='admin_edit_user_form' formName={'Edit user'} submitText='Edit' error={error} onSubmit={handleSubmit} inputs={[
            { label: 'Name', type: 'text', name: 'name', value: name, onChange: e => setName(getValue(e)) },
            { label: 'Surname', type: 'text', name: 'surname', value: surname, onChange: e => setSurname(getValue(e)) },
            { label: 'Email', type: 'email', name: 'user_email_address', value: user_email_address, onChange: e => setUser_email_address(getValue(e)) },
            { label: 'Phone', type: 'text', name: 'phone_number', value: phone_number, onChange: e => setPhone_number(getValue(e)) },
            { label: 'Birth date', type: 'date', name: 'date_of_birth', value: convertDate(), onChange: e => setDateOfBirth(getValue(e)) },
        ]
        }/>
    )

}
