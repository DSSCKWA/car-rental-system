import { Link, Route, Routes } from 'react-router-dom'
import { ManagerWorkersPage } from './ManagerWorkersPage.jsx'
import { AddWorkerPage } from './AddWorkerPage.jsx'


export function ManagerPage() {
    return (
        <div className='manager_page'>
            <div className='manager_container'>
                <nav className='manager_menu'>
                    <Link to='/manager/workers' className='manager_menu_item'>Workers</Link>
                    <Link to='/manager/add-worker' className='manager_menu_item'>Add worker</Link>
                </nav>
                <div className='manager_content'>
                    <Routes>
                        <Route path='workers' element={<ManagerWorkersPage/>}/>
                        <Route path='add-worker' element={<AddWorkerPage/>}/>
                    </Routes>
                </div>
            </div>

        </div>
    )
}
