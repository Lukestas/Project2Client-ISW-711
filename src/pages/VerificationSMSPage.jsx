import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {verificationSMSRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import ReusableForm from "../components/ReusableForm/ReusableForm"

export const VerificationSMSPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { parent } = useAuth()

    const fields = [
        { label: 'Codigo SMS', name: 'code', type: 'text', required: true }
    ];

    const handleVerifyCode = async (formData) => {
        try {
            const verificationSMSResquest = await verificationSMSRequest(parent.phone, formData.code)
            console.log(verificationSMSResquest)
            if (verificationSMSResquest.status === "approved") {
                navigate("/home");
            }
            else {
                setError("el codigo es incorrecto o experó")
            }

        } catch (error) {
            setError("Código incorrecto o expirado");
        }
    };

    return (
        <div className="form-container">
            <ReusableForm
                fields={fields}
                formName="SMS-Verification-form"
                formTitle="Verificacion SMS"
                formAction="Verificar"
                formReturnText="¿Volver?"
                formReturnDirection="/"
                clearCookiesOnReturn={true}
                onSubmit={handleVerifyCode}
            />
        </div>
    )
}
