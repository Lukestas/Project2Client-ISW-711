import React, { useState } from "react";
//import "./ModelPIN.scss";

const ModelPIN = ({ isOpen, onClose, onSubmit, selectedChild, pinType, errorMessage }) => {
    const [pin, setPin] = useState("");
    const [erros, setErrors] = useState(null);

    const handleChange = (e) => {
        setPin(e.target.value);
        setErrors(null);
    };

    //ESTOY TRABAJANDO EN ESTO
    const handlePin = async (e) => {
        e.preventDefault();
        if (pinType === "parent") {
            const ParentPinResquest = await getParentRequest(pin);
            if (pin === true) {
                setPinError(null);
                onSubmit();
                onClose();
            } else {
                setErrors(ParentPinResquest)
            }
        } else if (pinType === "child") {
            const ChildPinResquest = await getChildRequest(pin);
            if (pin) {
                setPinError(null);
                onSubmit();
                onClose();
            } else {
                setErrors(ChildPinResquest)
            }
        }
    }


    const PinSubmit = handleSubmit(() => {
        if (selectedChild.pin === pin) {
            navigate(`/child-page?id=${selectedChild._id}`);
            setPinError('');
        } else {
            setPinError('PIN incorrecto');
        }
    }
    )

    return (
        <div className="model-pin">
            <h2>Enter your PIN</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={pin}
                    onChange={handleChange}
                    placeholder="Enter your PIN"
                />
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}