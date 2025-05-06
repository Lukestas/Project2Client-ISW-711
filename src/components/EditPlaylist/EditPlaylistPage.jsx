import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import {  getOnePlayListRequest, updatePlaylistRequest } from "../../api/auth";
import ReusableForm from "../ReusableForm/ReusableForm"

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
