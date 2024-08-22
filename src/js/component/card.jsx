import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/card.css';

const Card = ({ name, address, phone, email, id }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container d-flex mb-1">
            <div>
                <img className="foto ms-2 md-2 rounded-circle vw-25 vh-25" src="https://media.istockphoto.com/id/1389348844/es/foto/foto-de-estudio-de-una-hermosa-joven-sonriendo-mientras-est%C3%A1-de-pie-sobre-un-fondo-gris.jpg?s=612x612&w=0&k=20&c=kUufmNoTnDcRbyeHhU1wRiip-fNjTWP9owjHf75frFQ=" alt="foto de contacto" />
            </div>
            <div className="datos ms-8 md-8">
                <h3 className="nombre mb-4">{name}</h3>
                <p>
                    <i className="fa-solid fa-location-dot"></i> {address}
                </p>
                <p>
                    <i className="fa-solid fa-phone"></i>
                    {phone}
                </p>
                <p>
                    <i className="fa-solid fa-envelope"></i> {email}
                </p>
            </div>
            <div className="botones ms-2 md-2  ms-auto">
                <Link
                    onClick={() => {
                        actions.contactoAEditar(name, email, phone, address, id);
                    }}
                    to={`/formulario/${id}`}>
                    <i className="fa-solid fa-pencil me-3"></i>
                </Link>

                <Link>
                    {' '}
                    <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                            actions.borrarContacto(id);
                        }}></i>
                </Link>
            </div>
        </div>
    );
};

export default Card;
