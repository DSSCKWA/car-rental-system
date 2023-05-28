import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './MenuStyles.css'

export function Menu(props) {

    const navigate = useNavigate()

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Vehicles', path: '/vehicles' },
    ]

    if (props.user?.permissions) {
        menuItems.push({ name: 'Profile', path: '/profile' })
    }

    if (props.user && props.user['permissions'] === 'admin') {
        menuItems.push({ name: 'Admin Panel', path: '/admin' })
    }

    if (props.user && props.user['permissions'] === 'manager') {
        menuItems.push({ name: 'Manager Panel', path: '/manager' })
    }

    if (props.user && props.user['permissions'] === 'worker') {
        menuItems.push({ name: 'Worker Panel', path: '/worker' })
    }

    if (props.user && props.user['permissions'] === 'client') {
        menuItems.push({ name: 'Client Panel', path: '/client' })
    }

    if (!props.user?.permissions) {
        menuItems.push({ name: 'Log In', path: '/login' })
        menuItems.push({ name: 'Register', path: '/register' })
    }

    function logout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (response.ok) {
                console.log('logout success')
                props.setUser(null)
                navigate('/')
            } else {
                console.log('logout failed')
                window.alert('Logout failed')
            }
        })
    }

    return (
        <div className='menu'>
            {menuItems.map(item =>
                <div className='menu_item' key={item.name}>
                    <Link to={item.path}>{item.name}</Link>
                </div>,
            )}

            {props.user?.permissions && <div className='menu_item'>
                <button className='menu_btn' onClick={logout}>Log Out</button>
            </div>}

        </div>

    )
}
