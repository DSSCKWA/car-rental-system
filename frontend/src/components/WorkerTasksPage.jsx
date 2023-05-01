import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export function WorkerTasksPage() {

    const navigate = useNavigate()
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

    return (
        <div className='worker_tasks_page page_content'>
            <h2>Tasks</h2>
            <table>
                <thead>
                <th>Task ID</th>
                <th>Description</th>
                <th>Name</th>
                <th>Rental ID</th>
                <th>Status</th>
                <th>Staff ID</th>
                </thead>
                <tbody>{tasks?.map(task => <tr>
                    <td>{task.task_id}</td>
                    <td>{task.description}</td>
                    <td>{task.name}</td>
                    <td>{task.rental_id}</td>
                    <td>{task.task_status}</td>
                    <td>{task.staff_id}</td>
                </tr>)}</tbody>
            </table>
        </div>
    )
}
