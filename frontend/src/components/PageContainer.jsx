import { Route, Routes } from 'react-router-dom'
import { MainPage } from './MainPage'
import { AboutPage } from './AboutPage'
import { RegisterPage } from './RegisterPage'
import { LoginPage } from './LoginPage'
import { AdminPage } from './AdminPage'
import { ManagerPage } from './ManagerPage.jsx'
import { WorkerPage } from './WorkerPage.jsx'
import { ClientPage } from './ClientPage.jsx'
import { ProfilePage } from './ProfilePage'
import { ChangePasswordPage } from './ChangePasswordPage'
import { VehiclesBasePage } from './VehiclesBasePage'

export function PageContainer(props) {
    const { user, setUser } = props
    return (
        <section className={'page_container'}>
            <Routes>
                <Route path='/' element={<MainPage user={user}/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage user={user} setUser={setUser}/>}/>
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/admin/*' element={<AdminPage/>} />
                <Route path='/worker' element={<WorkerPage/>}/>
                <Route path='/worker/*' element={<WorkerPage/>}/>
                <Route path='/manager' element={<ManagerPage/>}/>
                <Route path='/manager/*' element={<ManagerPage/>}/>
                <Route path='/client' element={<ClientPage/>}/>
                <Route path='/vehicles' element={<VehiclesBasePage />} />
                <Route path='/profile' element={<ProfilePage user={user} />} />
                <Route path='/profile/change-password' element={<ChangePasswordPage />} />
            </Routes>
        </section>
    )
}
