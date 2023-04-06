export function MainPage (props) {
    let message = ''
    if (props.user?.name) {
        message = `Welcome, ${props.user['name']}!`
    } else {
        message = 'Welcome to our car rental system!'
    }
    return (
        <div className='main_page'>
            <h1>Car Rental System</h1>
            <h2>{message}</h2>
        </div>
    )
}
