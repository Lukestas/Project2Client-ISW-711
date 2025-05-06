import React from 'react';
import './scss/VerificationPage.scss';

// This component is used to display the verification page after the user has registered
// It informs the user that a verification email has been sent to their email address
const VerificationPage = () => {
    return (
        <div className='verification-container'>
            <div className='verification-page'>
                <h1 className='verification-title'>Verificación de Correo Electrónico</h1>
                <p className='verification-message'>
                    Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para confirmar tu dirección de correo.
                </p>
                <p className='note'>
                    Si no encuentras el correo, revisa tu carpeta de spam.
                </p>
                <a href='/' className='login-link'>Volver a Iniciar Sesión</a>
            </div>
        </div>
    );
};

export default VerificationPage;