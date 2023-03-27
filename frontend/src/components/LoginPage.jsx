export function LoginPage() {
    return (
        <div className='login_page'>
            <h1>Login</h1>
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
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}
