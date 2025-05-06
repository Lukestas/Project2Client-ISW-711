import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { vertifyEmailRequest } from '../api/auth';

const VerificationMail = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const Parent = await vertifyEmailRequest(token);
                if (Parent.data) {
                    navigate("/")
                }

            } catch (error) {
                console.error("Error al verificar el correo:", error);
            }
        }
        verifyEmail()
    }, [])




    return (
        <div>
            <h1>Verifica tu correo electrónico</h1>
        </div>
    );
};

export default VerificationMail;