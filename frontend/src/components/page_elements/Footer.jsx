import Logo from '../../assets/logo.svg'
import FB from '../../assets/fb.png'
import IG from '../../assets/ig.webp'
import YT from '../../assets/yt.png'
import './FooterStyles.css'

export function Footer() {
    return (
        <footer className='footer_container'>
            <div className='footer_logo'>
                <img src={Logo} alt='logo' />
                <p>Car Rental System</p>
            </div>
            <div className='footer_social'>
                <a href='https://www.facebook.com/' target='_blank'>
                    <img src={FB} alt='fb' />
                </a>
                <a href='https://www.instagram.com/' target='_blank'>
                    <img src={IG} alt='ig' />
                </a>
                <a href='https://www.youtube.com/' target='_blank'>
                    <img src={YT} alt='yt' />
                </a>
            </div>
            <div className='footer_links'>
                <a className='footer_link' href='/api/files/terms-of-service' target='_blank'>Terms Of Service</a>
                <a className='footer_link' href='/api/files/privacy-policy' target='_blank'>Privacy Policy</a>
            </div>
            <div className='footer_contact'>
                <p className='footer_contact_title'>Contact Us</p>
                <p>Car Rental System</p>
                <p>Phone: +48 123 456 789</p>
                <p>Email: dssckwa@gmail.com</p>
                <p>NIP: 123-456-78-90</p>
                <p>REGON: 123456789</p>
                <p>Address: ul. Warszawska 24, 31-155 Kraków</p>
            </div>
            <p className='footer_rights'>
                Copyright © 2023 Car Rental System. All rights reserved.
            </p>
        </footer>
    )
}
