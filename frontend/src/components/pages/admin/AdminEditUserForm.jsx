import { Form } from '../../page_elements/Form.jsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


export function AdminEditUserForm() {
    const { id } = useParams()

    const [user, setUser] = useState(null)
    const [name, setName] = useState(user?.name)
    const [surname, setSurname] = useState(user?.surname)
    const [email, setEmail] = useState(user?.user_email_address)
    const [phone, setPhone] = useState(user?.phone_number)
    const [birth_date, setBirthDate] = useState(user?.date_of_birth)

    const [error, setError] = useState('')

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
                setEmail(data.user_email_address)
                setPhone(data.phone_number)
                setBirthDate(data.date_of_birth)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }

    useEffect(() => {
        get_user()
    }, [])

    function handleSubmit(e) {
        console.log('Submit')
    }

    function convertDate() {
        const date = new Date(birth_date)
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        return `${year}-${month}-${day}`
    }

    if (!user) return <div>Loading...</div>

    return (
        <Form className='admin_edit_user_form' formName={'Edit user'} submitText='Edit' error={error} onSubmit={handleSubmit} inputs={[
            { label: 'Name', type: 'text', name: 'name', value: name, onChange: setName },
            { label: 'Surname', type: 'text', name: 'surname', value: surname, onChange: setSurname },
            { label: 'Email', type: 'email', name: 'user_email_address', value: email, onChange: setEmail },
            { label: 'Phone', type: 'text', name: 'phone_number', value: phone, onChange: setPhone },
            { label: 'Birth date', type: 'date', name: 'date_of_birth', value: convertDate(), onChange: setBirthDate },
        ]
        }/>
    )

}
