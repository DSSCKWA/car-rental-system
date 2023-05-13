import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { ClientRentalsPage } from './ClientRentalsPage.jsx'

export function ClientPage() {
    return (
        <SidebarLayout className='client_page' navItems={[
            { name: 'Rentals', path: '/client/rentals' },
        ]}
        routes={[
            { path: '/rentals', element: <ClientRentalsPage/> },
        ]}/>
    )
}
