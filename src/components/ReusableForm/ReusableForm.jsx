import React, { useEffect, useState } from 'react';
import "./ReusableForm.scss";
import { useAuth } from '../../context/AuthContext';

// This component is a reusable form that can be used in different parts of the application.
const ReusableForm = ({ fields, formName, formAction, formTitle, formReturnText, formReturnDirection, error, onSubmit, defaultAvatar,clearCookiesOnReturn = false }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const {logout}=useAuth()

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

    const handleReturn = () => {
        if (clearCookiesOnReturn) {
            logout()
        }
        window.location.href = formReturnDirection; 
    };

    useEffect(() => {
        if (defaultAvatar) {
            setSelectedAvatar(defaultAvatar);
        }
    }, [defaultAvatar]);        

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
                    ) : field.image ? (
                        <div className="image-preview">
                            <label>{field.label}</label>
                            <img src={field.image} alt="Preview" className="form-image"/>
                        </div>
                    ) : (
                        <label>
                            {field.label}
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder || ''}
                                required={field.required || false}
                                defaultValue={field.defaultValue || ''}
                                readOnly={field.readOnly || false}
                                {...field.props}
                            />
                        </label>
                    )}
                </div>
            ))}
            <button type="submit">{formAction}</button>
            {formReturnText && (
                <button type="button" onClick={handleReturn}>{formReturnText}</button>
            )}
        </form>
    );
};

export default ReusableForm;