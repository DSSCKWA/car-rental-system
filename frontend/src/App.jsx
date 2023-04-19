import { useEffect, useState } from 'react'
import reactLogo from './assets/logo.svg'
import './App.css'
import { Menu } from './components/Menu'
import { PageContainer } from './components/PageContainer.jsx'
import { Footer } from './components/Footer'

function App() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        console.log('Getting info about the user')
        fetch('/api/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Got user info', data)
                setUser(data)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }, [])

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={reactLogo} className='App-logo' alt='logo' />
                <h1 className='title'>Car Rental System</h1>
            </header>
            <Menu user={user} setUser={setUser} />
            <PageContainer user={user} setUser={setUser} />
            <Footer />
        </div>
    )
}

export default App
