import React from "react";

const FormInput = ({ onSubmit, InputFields, buttonLabel }) => {
    return(
        <form onSubmit={onSubmit}>
            {InputFields.map(InputField => (
                    <div key={InputField.name}>
                    <label className="label">{InputField.label}</label>
                    <br/>
                    <input placeholder={InputField.placeholder} 
                           className={InputField.className}
                           type={InputField.type}
                           name={InputField.name}
                    />
                    <br/>
                </div>
            ))}
            <button>{buttonLabel}</button>
        </form>
    );
}

export default FormInput;