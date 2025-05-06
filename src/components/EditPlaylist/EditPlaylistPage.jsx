import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import {  getOnePlayListRequest, updatePlaylistRequest } from "../../api/auth";
import ReusableForm from "../ReusableForm/ReusableForm"


//This component is used to edit a playlist. It uses the ReusableForm component to render a form with the fields defined in the fields array. 
// The form is submitted to the handlesUpdatePlaylist function, which sends a request to update the playlist in the database.
function EditPlaylistPage() {
    const navigate = useNavigate();

    const fields=[
        {label:"Nuevo nombre de la playlist", type:"text",name:"name", required:true},
    ]

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const handlesUpdatePlaylist=async (formData)=>{
        try {
            await updatePlaylistRequest(id,formData)
            navigate("/playlistgestor")
        } catch (error) {
            
        }
    }

    return (
        <div className="form-container">
            <ReusableForm
                fields={fields}
                formName="edit-playlist-form"
                formTitle="Editar Playlist"
                formAction="Guardar"
                formReturnText="¿Deseas Volver?"
                formReturnDirection="/playlistgestor"
                onSubmit={handlesUpdatePlaylist}
            />
        </div>
    );
}

export default EditPlaylistPage;
