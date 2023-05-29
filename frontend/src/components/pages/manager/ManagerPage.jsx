import { Link, Route, Routes } from 'react-router-dom'
import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { ManagerWorkersPage } from './ManagerWorkersPage.jsx'
import { ManagerRentalsPage } from './ManagerRentalsPage.jsx'
import { AddWorkerPage } from './AddWorkerPage.jsx'
import React from 'react'
import { useEffect, useState } from 'react'
import { ModalComponent } from './ModalComponent.jsx'


export function ManagerPage() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)


    return (
        <div className='manager_page'>
            <div className='manager_container'>
                <nav className='manager_menu'>
                    <Link to='/manager/workers' className='manager_menu_item'>Workers</Link>
                    <Link to='/manager/add-worker' className='manager_menu_item'>Add worker</Link>
                    <Link to='/manager/rentals' className='manager_menu_item'>Rentals</Link>
                    <div className='manager_menu_item report_button' onClick={handleOpen}>Report</div>
                    <ModalComponent open={open} setOpen={setOpen} handleOpen={handleOpen} />
                </nav>


                <div className='manager_content'>
                    <Routes>
                        <Route path='workers' element={<ManagerWorkersPage />} />
                        <Route path='add-worker' element={<AddWorkerPage />} />
                        <Route path='rentals' element={<ManagerRentalsPage />} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}
