import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../pages/general/MainPage.jsx'
import { AboutPage } from '../pages/general/AboutPage.jsx'
import { RegisterPage } from '../pages/general/RegisterPage.jsx'
import { LoginPage } from '../pages/general/LoginPage.jsx'
import { AdminPage } from '../pages/admin/AdminPage.jsx'
import { ManagerPage } from '../pages/manager/ManagerPage.jsx'
import { WorkerPage } from '../pages/worker/WorkerPage.jsx'
import { ClientPage } from '../pages/user/ClientPage.jsx'
import { ProfilePage } from '../pages/user/ProfilePage.jsx'
import { ChangePasswordPage } from '../pages/user/ChangePasswordPage.jsx'
import { VehiclesBasePage } from '../pages/vehicles/VehiclesBasePage.jsx'

export function PageContainer(props) {
    const { user, setUser } = props
    return (
        <section className={'page_container'}>
            <Routes>
                <Route path='/' element={<MainPage user={user} />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage user={user} setUser={setUser} />} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/admin/*' element={<AdminPage />} />
                <Route path='/worker' element={<WorkerPage user={user} />} />
                <Route path='/worker/*' element={<WorkerPage user={user} />} />
                <Route path='/manager' element={<ManagerPage />} />
                <Route path='/manager/*' element={<ManagerPage />} />
                <Route path='/client' element={<ClientPage />} />
                <Route path='/client/*' element={<ClientPage />} />
                <Route path='/vehicles/*' element={<VehiclesBasePage user={user} />} />
                <Route path='/profile' element={<ProfilePage user={user} />} />
                <Route path='/profile/change-password' element={<ChangePasswordPage />} />
            </Routes>
        </section>
    )
}
