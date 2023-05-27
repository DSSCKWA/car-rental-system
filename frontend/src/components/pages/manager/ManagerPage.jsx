import { Link, Route, Routes } from 'react-router-dom'
//import './ManagerStyles.css'
import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { MainPage } from '../general/MainPage.jsx'
import { AboutPage } from '../general/AboutPage.jsx'
import { ManagerWorkersPage } from './ManagerWorkersPage.jsx'
import { AddWorkerPage } from './AddWorkerPage.jsx'
import { ManagerRentalsPage } from './ManagerRentalsPage.jsx'


export function ManagerPage() {
    return (
        <SidebarLayout className='manager_page' navItems={[
            { name: 'Workers', path: '/manager/workers' },
            { name: 'Add worker', path: '/manager/add-worker' },
            { name: 'Rentals', path: '/manager/rentals' },
        ]}
            routes={[
                { path: '/workers', element: <ManagerWorkersPage /> },
                { path: '/add-worker', element: <AddWorkerPage /> },
                { path: '/rentals', element: <ManagerRentalsPage /> },
            ]} />
    )
}
