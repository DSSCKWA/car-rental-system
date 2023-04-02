import { Route, Routes } from 'react-router-dom'
import { MainPage } from './MainPage'
import { AboutPage } from './AboutPage'
import { RegisterPage } from './RegisterPage'
import { LoginPage } from './LoginPage'
import { AdminPage } from './AdminPage'
import { ManagerPage } from './ManagerPage.jsx'
import { WorkerPage } from './WorkerPage.jsx'
import { ClientPage } from './ClientPage.jsx'
export function PageContent() {
    return (
        <section className='page_content'>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/worker' element={<WorkerPage />} />
                <Route path='/manager' element={<ManagerPage />} />
                <Route path='/client' element={<ClientPage />} />
            </Routes>
        </section>
    )
}
