import React, { useState } from "react";
import ReusableForm from "../ReusableForm/ReusableForm";
import "./ReusableModelPIN"

const ReusableModelPIN = ({ isOpen, onClose, onSubmit, selectedChild, pinType }) => {
    const [pin, setPin] = useState("");
    const [errors, setErrors] = useState(null);

    const fields = [
        { label: "PIN", name: "pin", type: "password", required: true, placeholder: "Enter your PIN" },
    ];


    const handlePin = async (e) => {
        e.preventDefault();
        if (pinType === "parent") {
            const ParentPinResquest = await getParentRequest(pin);
            if (ParentPinResquest === true) {
                setPinError(null);
                onSubmit();
                onClose();
            } else {
                setErrors(ParentPinResquest)
            }
        } else if (pinType === "child") {
            const ChildPinResquest = await getChildRequest(pin, selectedChild._id);
            if (ChildPinResquest === true) {
                setPinError(null);
                onSubmit();
                onClose();
            } else {
                setErrors(ChildPinResquest)
            }
        }
    }

    return (
        <div className="pin-modal">
            <div className="modal-content">
                <h2>{title}</h2>
                {description && <p>{description}</p>}
                <form className="form-modal-pin" onSubmit>
                    <input type="password" placeholder="Ingrese el PIN" value={pin} />
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-buttons">
                        <button type="submit" className="enter-pin">Aceptar</button>
                        <button type="button" className="cancel-pin" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
                {options.length > 0 && (
                    <div className="modal-options">
                        {options.map((option, index) => (
                            <button key={index} className={option.className} onClick={option.onClick}>{option.label}</button>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReusableModelPIN;