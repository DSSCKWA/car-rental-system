import { Link } from 'react-router-dom'

export function MainPage (props) {
    let message = ''
    if (props.user?.name) {
        message = `Welcome, ${props.user['name']}!`
    } else {
        message = 'Welcome to our car rental system!'
    }
    return (
        <div className='main_page'>
            <div className='page_content'>
                <h2>{message}</h2>
                <p>
                    Our company offers a wide range of cars for rent. We have cars of different brands and models, so you can choose the one that suits you best. We also offer different types of insurance, so you can be sure that your car will be safe. Our prices are very competitive and we are sure that you will be satisfied with our services.
                </p>
                <h3>Why choose us?</h3>
                <ul>
                    <li>Our company had many years of experience in this field</li>
                    <li>We have won many awards for our services</li>
                    <li>We provide high quality services</li>
                    <li>We always take care of our customers</li>
                    <li>We provide a special discount for our regular customers</li>
                </ul>
                <p>
                     You can read more about our company on the <Link to='/about' className='link_text'>About Us</Link> page.
                </p>
                <h3>How to rent a car?</h3>
                <p>
                    First, create user account or login to your existing one. After that you can choose the car from the <Link to={'/vehicles'} className='link_text'>Vehicles</Link> page. Feel free to use filters, which will help you to find the car you need.
                </p>
            </div>
        </div>
    )
}
