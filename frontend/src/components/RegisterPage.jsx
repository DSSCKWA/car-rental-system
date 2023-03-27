export function RegisterPage() {
    return (
        <div className='register_page'>
            <h1>Register</h1>
            <form>
                <div className='form_group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' />
                </div>
                <div className='form_group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' />
                </div>
                <div className='form_group'>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input type='password' id='confirm_password' name='confirm_password' />
                </div>
                <div className='form_group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' />
                </div>
                <div className='form_group'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='tel' id='phone' name='phone' />
                </div>
                <div className='form_group'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )

}
