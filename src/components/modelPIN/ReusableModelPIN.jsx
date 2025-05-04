import React, { useState } from "react";
import ReusableForm from "../ReusableForm/ReusableForm";
//import "./ModelPIN.scss";

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
        <div className="model-pin">
            <ReusableForm
                error={errors}
                fields={fields}
                formTitle="Ingrese el PIN"
                formName="pin-form"
                formAction="Aceptar"
                onSubmit={handlePin}
                formReturnText="Cancelar"
                formReturnDirection={onClose}
            />
        </div>
    );
}

export default ReusableModelPIN;