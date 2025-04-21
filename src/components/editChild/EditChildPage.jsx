import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditChildPage.scss'
import { getChildRequest, getParentRequest, updateChildRequest } from '../../api/auth';

const avatars = [
    "/avatars/avatar0.png",
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png"
];

function EditChildPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [parentPin, setParentPin] = useState('');
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm()

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const fetchChildData = async () => {
            try {
                const response = await getChildRequest(id);
                const child = response.data;
                setValue("name", child.name);
                setValue("avatar", child.avatar);
            } catch (error) {
                setError('No se pudo cargar la información del niño');
            }
        };

        fetchChildData();
    }, [id]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateChildRequest(id, { name: data.name, avatar: data.avatar, pin: data.pin });
            navigate('/home');
        } catch (err) {
            console.error("Error updating child", err);
            setError('No se pudo actualizar los datos del niño');
        }
    });

    const handleAvatarChange = (avatar) => {
        setValue("avatar", avatar);
    };

    return (
        <div className="edit-child-container">
            <form className='form-edit' onSubmit={onSubmit}>
                <h1 className='title-edit'>Editar Perfil del Niño</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                    <label>Nombre:</label>
                    <input
                        className="inputs"
                        type="text"
                        {...register('name', { required: 'Este campo es obligatorio' })}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>
                <div className="input-container">
                    <label>PIN</label>
                    <input type="number" className="inputs"{...register('pin', { required: true, minLength: 4, maxLength: 6 })} />
                    {errors.pin && <p className="required">Se requiere un PIN de 6 dígitos</p>}
                </div>
                <div className="input-container">
                    <label>Avatar:</label>
                    <div className="avatar-selection">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${avatar === watch('avatar') ? 'selected' : ''}`}
                                onClick={() => handleAvatarChange(avatar)}
                            >
                                <img src={avatar} alt={`Avatar ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="input-container">
                    <label>PIN del Padre:</label>
                    <input
                        type="password"
                        className="inputs"
                        value={parentPin}
                        onChange={(e) => setParentPin(e.target.value)}
                        placeholder="Ingrese su PIN"
                    />
                    {errors.parentPin && <p className="required">Se requiere un PIN de 6 dígitos</p>}
                </div>
                <div className='button-container'>
                    <button className="buttons" type="submit">Actualizar</button>
                </div>
                <div className="cancel-link">
                    <Link to="/">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}

export default EditChildPage;