import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { AdminEditUsersPage } from './AdminEditUsersPage.jsx'

export function AdminPage() {
    return (
        <SidebarLayout className='admin_page' navItems={[
            { name: 'Edit Users', path: '/admin/edit-users' },
        ]}
        routes={[
            { path: '/edit-users', element: <AdminEditUsersPage/> },
        ]}/>
    )
}
