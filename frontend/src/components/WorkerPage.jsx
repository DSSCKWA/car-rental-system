import {Link} from "react-router-dom";

export function WorkerPage() {
    return (
        <div className='worker_page'>
            <h1>Worker</h1>
            <Link to="/worker/rentals">Rentals</Link>
        </div>
    )
}
