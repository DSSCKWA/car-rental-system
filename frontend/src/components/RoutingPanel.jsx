import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
export function RoutingPanel(props) {
    return (
        <div className='routing_panel'>
            <Routes>
                {
                    props.routes.map(route => <Route path={route.path} element={route.element}/>)
                }
            </Routes>
        </div>
    )
}
