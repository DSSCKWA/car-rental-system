import { SidebarLayout } from '../../page_elements/SidebarLayout.jsx'
import { WorkerTasksPage } from './WorkerTasksPage.jsx'
import { WorkerRentalsPage } from './WorkerRentalsPage.jsx'
import { WorkerCarsPage } from './WorkerCarsPage.jsx'
import { WorkerCarsReviewPage } from './WorkerCarsReviewPage.jsx'

export function WorkerPage(props) {
    const { user } = props
    return (
        <SidebarLayout className='worker_page' navItems={[
            { name: 'Tasks', path: '/worker/tasks' },
            { name: 'Rentals', path: '/worker/rentals' },
            { name: 'Cars', path: '/worker/cars' },
        ]}
            routes={[
                { path: '/tasks', element: <WorkerTasksPage user={user} /> },
                { path: '/rentals', element: <WorkerRentalsPage /> },
                { path: '/cars', element: <WorkerCarsPage /> },
                { path: '/cars/review', element: <WorkerCarsReviewPage /> },
            ]} />
    )
}
