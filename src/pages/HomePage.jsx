import React, { useEffect, useState } from 'react';
import { deleteChildByID, getParentRequest } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import "./scss/HomePage.scss"
import { useNavigate } from 'react-router-dom';
import { getChildrensByParentId } from '../api/graphqlQuerys';
import { NavBar } from '../components/NavBar/NavBar';


//This component is used to display the home page of the parent
//It fetches the children of the parent and displays them
function HomePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logout } = useAuth();
  const [childrens, setChildrens] = useState([])
  const [pin, setPin] = useState('')
  const [selectedChild, setSelectedChild] = useState(null)
  const [isPinModalOpen, setIsPinModalOpen] = useState(false)
  const [pinError, setPinError] = useState('');
  const [isParentPinModalOpen, setIsParentPinModalOpen] = useState(false);
  const [routeP, setRouteP] = useState('')
  const navigate = useNavigate();

  useEffect(() => {

    const getChildrens = async () => {
      try {
        const Parent = await getParentRequest();
        const Childs = await getChildrensByParentId(Parent.data._id);
        setChildrens(Childs)
      } catch (error) {
        console.log("Error al obtener los niños: ", error);
      }
    };

    getChildrens();
  }, [])

  const handleAvatarClick = (child) => {
    setSelectedChild(child);
    setIsPinModalOpen(true);
  };

  const handleEditChild = (e) => {
    e.preventDefault();
    if (selectedChild) {
      setIsPinModalOpen(false)
      setIsParentPinModalOpen(true);
      setRouteP(`/child-edit?id=${selectedChild._id}`)
    }
  };

  const handleDeleteChildProfile = async () => {
    setIsPinModalOpen(false)
    setIsParentPinModalOpen(true);
    setRouteP(`toDelete`)
  };


  const PinSubmit = handleSubmit(() => {
    if (selectedChild.pin === pin) {
      navigate(`/child-page?id=${selectedChild._id}`);
      setPinError('');
    } else {
      setPinError('PIN incorrecto');
    }
  }
  )
  const handleRegisterChild = () => {
    setIsParentPinModalOpen(true);
    setRouteP('/register-child')
  };

  const ParentPinSubmit = handleSubmit(async () => {
    const Parent = await getParentRequest();
    if (pin === Parent.data.pin) {
      if (routeP === "toDelete" && selectedChild) {
        await deleteChildByID(selectedChild._id);
        setSelectedChild(null);
        const Childs = await getChildrensRequest();
        setChildrens(Childs.data);
      } else {
        navigate(routeP);
      }
      setIsParentPinModalOpen(false);
    } else {
      setPinError('PIN incorrecto');
    }
  });

  return (
    <div className="home-container">
      <NavBar />
      <div className='home-welcome'>
        <h1>Panel de Padres</h1>
        <button className="add-child-button" onClick={handleRegisterChild}>
          Agregar Niño
        </button>
      </div>
      <div className="children-list">
        {childrens.map((child) => (
          <div
            key={child._id}
            className="child-avatar"
            onClick={() => handleAvatarClick(child)}
          >
            <img src={child.avatar} alt={child.name} />
            <p>{child.name}</p>
          </div>
        ))}
      </div>
      {isPinModalOpen && (
        <div className="pin-modal">
          <div className="modal-content">
            <h2>Introduce el PIN del niño</h2>
            <form onSubmit={PinSubmit}>
              <input type="password" placeholder="PIN" {...register('pin', { required: 'Este campo es obligatorio', maxLength: 6 })} onChange={(e) => setPin(e.target.value)} />
              {errors.pin && (<p className="error-message">{errors.pin.message}</p>)}
              <div className="modal-buttons">
                <button className="enter" type="submit">Ingresar</button>
                <button className="edit" type="button" onClick={handleEditChild}>Editar</button>
                <button className="cancel" type="button" onClick={() => setIsPinModalOpen(false)}>Cancelar</button>
                <button className="delete" type="button" onClick={handleDeleteChildProfile}>Eliminar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isParentPinModalOpen && (
        <div className="pin-modal">
          <div className="modal-content">
            <h2>Introduce el PIN del Padre</h2>
            <form onSubmit={ParentPinSubmit}>
              <input type="password" placeholder="PIN del Padre" {...register('pin', { required: 'Este campo es obligatorio', maxLength: 6 })} onChange={(e) => setPin(e.target.value)} />
              {errors.pin && (<p className="error-message">{errors.pin.message}</p>)}
              {pinError && <p className="error-message">{pinError}</p>}
              <div className="modal-buttons">
                <button className="enter" type="submit">Ingresar</button>
                <button className="cancel" type="button" onClick={() => setIsParentPinModalOpen(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
