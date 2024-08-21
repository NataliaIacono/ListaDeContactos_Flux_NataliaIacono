import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext.js';

import { Link, useParams } from 'react-router-dom';
import Card from '../component/card.jsx';

const Agenda = () => {
    const { actions, store } = useContext(Context);
    /* useEffect(() => {
        actions.traerContactosDeLaApi();
    }, []);*/
    return (
        <div className="container m-auto border border-0 ">
            <div className="boton d-flex justify-content-end mt-3 mb-3">
                <Link to="/formulario">
                    <span className="btn btn-primary btn-md justify-content-end" href="./formulario" role="button">
                        Agregar nuevo contacto
                    </span>
                </Link>
            </div>

            {store.contactos?.map(
                (
                    contacto, // ? si encuentra que el array esta vacio no hace el map
                ) => (
                    <Card key={contacto.id} name={contacto.name} email={contacto.email} phone={contacto.phone} adress={contacto.address} id={contacto.id} />
                ),
            )}
        </div>
    );
};

export default Agenda;
