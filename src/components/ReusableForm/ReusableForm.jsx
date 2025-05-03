import React, { useState } from 'react';
import "./ReusableForm.scss";

// This component is a reusable form that can be used in different parts of the application.
const ReusableForm = ({ fields, formName, formAction, formTitle, formReturnText, formReturnDirection, error, onSubmit }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // This function handles the form submission. It prevents the default form submission behavior and collects the form data.
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (selectedAvatar) {
            data.avatar = selectedAvatar; // Add the selected avatar to the form data
        }
        onSubmit(data);
    };

    // This function renders the form fields based on the provided fields prop.
    return (
        <form className={formName} onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <h1>{formTitle}</h1>
            {fields.map((field, index) => (
                <div key={index}>
                    {field.type === 'avatar' ? (
                        <div className="avatar-selection">
                        <label>{field.label}</label>
                        <div className="avatars">
                          {field.options.map((avatar, i) => (
                            <img
                              key={i}
                              src={avatar}
                              alt={`Avatar ${i + 1}`}
                              className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                              onClick={() => setSelectedAvatar(avatar)}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                        <label>
                            {field.label}
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder || ''}
                                required={field.required || false}
                                {...field.props}
                            />
                        </label>
                    )}
                </div>
            ))}
            <button type="submit">{formAction}</button>
            {formReturnText && (
                <button type="button" onClick={() => (window.location.href = formReturnDirection)}>{formReturnText}</button>
            )}
        </form>
    );
};

export default ReusableForm;
