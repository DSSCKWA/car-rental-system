import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { AdminEditUsersPage } from './AdminEditUsersPage.jsx'
import { AdminEditUserForm } from './AdminEditUserForm.jsx'

export function AdminPage() {
    return (
        <SidebarLayout className='admin_page' navItems={[
            { name: 'Edit Users', path: '/admin/edit-users' },
        ]}
        routes={[
            { path: '/edit-users', element: <AdminEditUsersPage/> },
            { path: '/edit-users/:id', element: <AdminEditUserForm/> },
        ]}/>
    )
}
