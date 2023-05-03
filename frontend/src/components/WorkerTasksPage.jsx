import {useEffect, useState} from 'react'

export function WorkerTasksPage() {

    const [tasks, setTasks] = useState(null)
    useEffect(() => {
        get_tasks()
    }, [])

    function get_tasks() {
        fetch('/api/task/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.task_id - b.task_id);
                setTasks(data)
            })
            .catch(error => {
                console.log('Error getting rental info', error)
            })
    }

    async function change_task_status(id, task_status) {
        await fetch(`/api/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({task_status}),
        })
        get_tasks()
    }

    async function assign_worker_to_task(task_id) {
        await fetch(`/api/task/${task_id}/assign`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({task_id}),
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
                <th>Assigned worker name</th>
                <th>Assigned worker surname</th>
                <th>Worker ID</th>
                <th>Actions</th>
                </thead>
                <tbody>{tasks?.map(task => <tr>
                    <td>{task.rental_id}</td>
                    <td>{task.task_description}</td>
                    <td>{task.task_status}</td>
                    <td>{task.worker_name}</td>
                    <td>{task.worker_surname}</td>
                    <td>{task.staff_id}</td>
                    <td>
                        <button onClick={() => {
                            change_task_status(task.task_id,
                                task.task_status === 'completed' ? 'active' :
                                    (task.task_status === 'active' ? 'in_progress' : 'completed'))
                        }}>
                            {task.task_status === 'completed' ? 'Reopen' :
                                (task.task_status === 'active' ? 'Begin' : 'Close')}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => {
                            assign_worker_to_task(task.task_id)
                        }}>Assign to me
                        </button>
                    </td>
                </tr>)}</tbody>
            </table>
        </div>
    )
}
