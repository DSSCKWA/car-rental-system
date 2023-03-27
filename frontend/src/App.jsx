import { useState } from 'react'
import reactLogo from './assets/logo.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Menu from './assets/components/'
import { Menu } from './components/Menu'
import { PageContent } from './components/PageContent.jsx'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={reactLogo} className='App-logo' alt='logo' />
                <h1 className='title'>Car Rental System</h1>
            </header>
            <Menu />
            <PageContent />
        </div>
    )
}

export default App
