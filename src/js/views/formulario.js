import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useParams } from 'react-router-dom';
import '../../styles/formulario.css';

const Formulario = () => {
    const parametros = useParams(); // para obtener el los paramertros de la url
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parametros.id) {
            console.log(parametros.id);

            actions.editarContacto(name, email, phone, adress, parametros.id);
        } else {
            actions.agregarContactoaLaApi(name, email, phone, adress);
        }
        setName('');
        setEmail('');
        setPhone('');
        setAdress('');
    };

    console.log(parametros);

    return (
        <div className="container ">
            <div className="w-50 m-auto p-2">
                <h1>Formulario de contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nombre
                        </label>
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" value={name} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Telefono
                        </label>
                        <input onChange={(e) => setPhone(e.target.value)} type="number" className="form-control" id="telefono" value={phone} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">
                            Direccion
                        </label>
                        <input onChange={(e) => setAdress(e.target.value)} type="text" className="form-control" id="direccion" value={adress} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                        Guardar
                    </button>
                </form>
                <Link to="/">
                    <span href="#" role="button">
                        Volver a contactos
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Formulario;
