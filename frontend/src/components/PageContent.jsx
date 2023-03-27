import { Route, Routes } from 'react-router-dom'
import { MainPage } from './MainPage'
import { AboutPage } from './AboutPage'
import { RegisterPage } from './RegisterPage'
import { LoginPage } from './LoginPage'
import { AdminPage } from './AdminPage'
export function PageContent() {
    return (
        <section className='page_content'>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/admin' element={<AdminPage />} />
            </Routes>
        </section>
    )
}
