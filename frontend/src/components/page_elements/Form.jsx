export function Form({ formName, className, onSubmit, inputs, error, submitText }) {
    return (
        <div className='form'>
            <h2>{formName}</h2>
            <form onSubmit={onSubmit} className={className}>
                <p className='errorMessage'>{error}</p>
                {inputs.map(input => {
                    return (
                        <div key={input.name} className='form_group'>
                            <label htmlFor={input.name}>{input.label}</label>
                            <input type={input.type} name={input.name} id={input.name} onChange={input.onChange} />
                        </div>
                    )
                })}
                <button type='submit'>{submitText}</button>
            </form>
        </div>
    )
}
