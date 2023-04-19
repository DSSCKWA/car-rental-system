import { NavigationPanel } from './NavigationPanel.jsx'
import { RoutingPanel } from './RoutingPanel.jsx'
import '../styles/SidebarLayoutStyles.css'

export function SidebarLayout(props) {
    return (
        <div className={`sidebar_layout ${props.className}`}>
            <NavigationPanel navItems={props.navItems}/>
            <RoutingPanel routes={props.routes}/>
        </div>
    )
}
