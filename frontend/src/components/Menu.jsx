import * as PropTypes from 'prop-types'

function Link(props) {
    return (
        <a className='menu_link' href={props.to}>{props.children}</a>
    )
}

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
}

export function Menu() {
    return (
        <div className='menu'>
            <div className='menu_item'>
                <Link to='/'>Home</Link>
            </div>
            <div className='menu_item'>
                <Link to='/about'>About</Link>
            </div>
            <div className='menu_item'>
                <Link to='/register'>Register</Link>
            </div>
            <div className='menu_item'>
                <Link to='/login'>Log In</Link>
            </div>
        </div>

    )
}
