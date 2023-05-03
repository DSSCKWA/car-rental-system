import { Link } from 'react-router-dom'

export function NavigationPanel(props) {
    return (
        <div className='navigation_panel'>
            {props.navItems.map(el =>
                <Link to={el.path} className='navigation_panel_item' key={el.path}>{el.name}</Link>,
            )}
        </div>
    )
}
