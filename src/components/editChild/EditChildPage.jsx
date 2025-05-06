import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditChildPage.scss'
import { getChildRequest, getParentRequest, updateChildRequest } from '../../api/auth';
import ReusableForm from '../ReusableForm/ReusableForm';
import { getChildById } from '../../api/graphqlQuerys';

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
    const [error, setError] = useState('');
    const [fields, setFields] = useState([])
    const [child,setChild]=useState("")

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const getChild = async () => {
            try {
                const childRequest = await getChildById(id);
                setChild(childRequest)
                setFields([
                    {
                        name: "name",
                        type: "text",
                        label: "Nombre de niño",
                        placeholder: "Nombre de niño",
                        defaultValue: childRequest.name,
                    },
                    { 
                        type: 'number', 
                        name: 'pin', 
                        label: 'PIN', 
                        required: true, 
                        minLength: 4, 
                        maxLength: 6 },
                    { 
                        type: 'avatar', 
                        name: 'avatar', 
                        label: 'Avatar', 
                        options: avatars
                    }
                ]);
            } catch (error) {
                setError('No se pudo cargar la información del niño');
            }
        };

        getChild();
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            const {name,avatar,pin} = formData
            await updateChildRequest(id, { name, avatar, pin });
            navigate('/home');
        } catch (err) {
            console.error("Error updating child", err);
            setError('No se pudo actualizar los datos del niño');
        }
    }

    return (
        <div className="form-container">
            <ReusableForm
                error={error}
                fields={fields}
                formName="edit-child-form"
                formTitle="Editar de niño"
                formAction="Guardar"
                formReturnText="¿Deseas Volver?"
                formReturnDirection="/Home"
                onSubmit={handleUpdate}
                defaultAvatar={child.avatar}
            />
        </div>
    );
}

export default EditChildPage;