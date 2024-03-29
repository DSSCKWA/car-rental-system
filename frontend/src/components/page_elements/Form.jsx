import './FormStyles.css'
export function Form({ formName, className, onSubmit, inputs, error, submitText }) {
    return (
        <div className='form page_content'>
            <h2>{formName}</h2>
            <form onSubmit={onSubmit} className={className}>
                {inputs.map(input => {
                    {
                        switch (input.type) {
                            case 'select': {
                                return (
                                    <div key={input.name} className='form_group'>
                                        <label htmlFor={input.name}>{input.label}</label>
                                        <select name={input.name} id={input.name} onChange={input.onChange}>
                                            {input.options.map(option => {
                                                return <option value={option.value}>{option.label}</option>
                                            })}
                                        </select>
                                    </div>
                                )
                            }
                            default:
                                return (
                                    <div key={input.name} className='form_group'>
                                        <label htmlFor={input.name}>{input.label}</label>
                                        <input type={input.type} name={input.name} id={input.name} onChange={input.onChange} defaultValue={input.default} value={input.value} />
                                    </div>
                                )
                        }
                    }
                })}
                <p className='errorMessage'>{error}</p>
                <button type='submit'>{submitText}</button>
            </form>
        </div>
    )
}
