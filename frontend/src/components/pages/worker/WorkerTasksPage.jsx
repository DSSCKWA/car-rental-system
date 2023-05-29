import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function WorkerTasksPage(props) {
    const { user } = props
    const navigate = useNavigate()
    const [tasks, setTasks] = useState(null)
    useEffect(() => {
        get_tasks()
    }, [])

    function get_tasks() {
        fetch('/api/tasks/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.task_id - b.task_id)
                setTasks(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    async function change_task_status(id, task_status) {
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task_status }),
        })
        get_tasks()
    }

    async function assign_worker_to_task(task_id) {
        await fetch(`/api/tasks/${task_id}/assign`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task_id }),
        })
        get_tasks()
    }


    return (
        <div className='worker_tasks_page page_content'>
            <h2>Tasks</h2>
            <table>
                <thead>
                    <th>Rental ID</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Assigned worker</th>
                    <th>Actions</th>
                </thead>
                <tbody>{tasks?.map(task => <tr>
                    <td>{task.rental_id}</td>
                    <td>{task.task_description}</td>
                    <td>{task.task_status.replace(/_/g, ' ')}</td>
                    <td>{task.worker_name} {task.worker_surname}</td>
                    < td >
                        {task.task_status !== 'completed' && task.task_status !== 'canceled' && (task.staff_id === user?.user_id || !task.staff_id) &&
                            <button onClick={() => {
                                if (!task.staff_id) {
                                    assign_worker_to_task(task.task_id)
                                } else if (task.task_type === 'prepare_vehicle') {
                                    change_task_status(task.task_id, task.task_status === 'active' ? 'completed' : '')
                                } else {
                                    navigate('/worker/cars/review', { state: { 'rental_id': task.rental_id } })
                                }
                            }}>
                                {task.staff_id ? task.task_status === 'active' && task.task_type === 'prepare_vehicle' ? 'Close' : 'Review' : 'Assign to me'}
                            </button>
                        }
                    </td>
                </tr>)}</tbody>
            </table>
        </div >
    )
}
