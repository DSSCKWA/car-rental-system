import Achievement from '../../../assets/achievement.png'
import CarsImage from '../../../assets/cars.jpg'
export function ContactInfoLine({ name, value }) {
    return (
        <>
            <span className='contact_name'>{name}:</span>
            <span className='contact_value'>{value}</span>
        </>
    )
}
export function AboutPage() {
    return (
        <div className='about_page'>
            <div className='about_info'>
                <h2>Who are we?</h2>
                <div className='about_us'>
                    <p>
                        We are a group of enthusiasts who decided to create a company which would enable people to rent cars easily. We have been working in this field for many years and we know how to make our customers happy. We are a team of professionals who are always ready to help you. Our services are constantly developed to be the best and this is what makes us different than other companies.
                    </p>
                    <img src={CarsImage} alt='cars' />
                </div>
            </div>
            <div className='about_info'>
                <h2>Our mission</h2>
                <p>
                    Our goal is to enable people to rent cars in a simple and convenient way. We know that cars make it easier to meet your friends, go to work, or go on a trip. Staying in touch with your friends and family is important, as is getting new experiences. We want to make it easy for you to do all of these things. Our motto is:
                </p>
                <figure className='motto'>
                    <blockquote>
                        “You’re off to great places! Today is your day! Your mountain is waiting, So get on your way!”
                    </blockquote>
                    <figcaption>
                        — Dr. Seuss
                    </figcaption>
                </figure>
            </div>
            <div className='about_info'>
                <h2>Our achievements</h2>
                <div className='achievements'>
                    <p>
                        We have been operating since 2021 and we are constantly developing our services and improving the quality of our services. Our customers are very satisfied with our services and we are very proud of that. We also got awards for The Best Car Rental Company in 2021 and 2022.
                    </p>
                    <img src={Achievement} alt='Achievement' />
                </div>
            </div>
            <div className='about_info'>
                <h2>Contact us</h2>
                <div className='contact_info'>
                    <ContactInfoLine name='Company name' value='Car Rental System' />
                    <ContactInfoLine name='Contact person' value='Jan Kowalski' />
                    <ContactInfoLine name='Phone number' value='+48 123 456 789' />
                    <ContactInfoLine name='Email' value='dssckwa@gmail.com' />
                    <ContactInfoLine name='NIP' value='123-456-78-90' />
                    <ContactInfoLine name='REGON' value='123456789' />
                </div>
            </div>
            <div className='about_info'>
                <h2>Location</h2>
                <div className='location'>
                    <p>
                        Our company is located in Krakow, Poland.
                        The address is: <br />
                        ul. Warszawska 24 <br />
                        31-155 Kraków
                    </p>
                    <div className='map'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.7565576100637!2d19.941223915717657!3d50.07212062942489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b04a4a0d5bf%3A0x41a815e1860a19eb!2sPolitechnika%20Krakowska%20im.%20Tadeusza%20Ko%C5%9Bciuszki!5e0!3m2!1spl!2spl!4v1681320920069!5m2!1spl!2spl'
                            style={{ border: 0 }}
                            allowFullScreen=''
                            loading='lazy'
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
