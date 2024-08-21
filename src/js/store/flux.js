import contactDispatcher from './contactDispatcher';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contactos: [], // aqui se almacenaran todos los contactos que vengan de la api
            nombre: 'Natalia',
            // contacto: {},
        },
        actions: {
            traerContactosDeLaApi: async () => {
                const contactList = await contactDispatcher.get();
                const store = getStore(); // en la const store guardo todo lo que tiene store
                setStore({ ...store, contactos: contactList }); // actualizo el store
                console.log(getStore());
                console.log(store.contactos);
            },

            crearAgenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Natalia', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log('La genda ya existe');
                    }
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Agenda creada exitosamente');
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            /* traerContactosDeLaApi: async () => {
                try {
                    const response = await contactDispatcher.get();

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contactList: data.contactList });
                    }

                    console.log(contactList);
                } catch (error) {
                    console.log('error al traer la lista de contactos');
                }
            },*/

            agregarContactoaLaApi: async (name, email, phone, address) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Natalia/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name, // aca voy a tener que poner el estado que capatura el valor del input
                            phone: phone,
                            email: email,
                            address: address,
                        }),
                    });
                    if (!response.ok) {
                        console.log('No se ha podido agregar el contacto');
                    }
                    if (response.ok) {
                        console.log('Contacto agregado exitosamente');
                    }
                    const data = await response.json();
                    console.log(data);
                    const store = getStore(); // obtengo el estado, todos los estados
                    console.log(store);
                    //setStore([...store.contactos, data]); // esta mal en este caso... modifico el estado, aca estoy cambiando todo el store, y sobreescribiendo el objeto de store,para ponerlo en un array

                    setStore({ contactos: [...store.contactos, data] }); //modifique el estado de contactos
                    //setStore({ ...store, nombre: 'javier' }); es un ejemplo
                    console.log(store);
                } catch (error) {
                    console.log(error);
                }
            },

            editarContacto: async (name, email, phone, address, id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Natalia/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            phone: phone,
                            email: email,
                            address: address,
                        }),
                    });
                    if (!response.ok) {
                        console.log('No se ha podido editar el contacto');
                        throw 'ha ocurrido un error al editar el contacto'; // si el codigo entra aqui, ya luego se va al catch
                    }

                    console.log('Contacto modificado');

                    const data = await response.json();
                    console.log(data);
                    const store = getStore(); // obtengo el estado, todos los estados
                    console.log(store);

                    const contactosModificados = store.contactos.map((item) => {
                        if (item.id === id) {
                            // return { ...item.data };
                            return { data };
                        }
                        return item;
                    });

                    setStore({ contactos: contactosModificados });
                    //setStore({ contactos: [...contactosModificados] }); //modifique el estado de contactos

                    console.log(store);
                } catch (error) {
                    console.log(error);
                }
            },

            borrarContacto: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Natalia/contacts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log('No se ha podido borrar el contacto');
                        throw 'ha ocurrido un error al borrar el contacto'; // si el codigo entra aqui, ya luego se va al catch
                    }

                    console.log('Contacto borrado');

                    let data;
                    if (response.status !== 204) {
                        data = await response.json();
                        console.log(data);
                    } else {
                        console.log('Respuesta sin contenido');
                    }

                    const store = getStore(); // obtengo el estado, todos los estados
                    console.log(store);

                    const contactosModificados = store.contactos.filter((item) => {
                        return item.id != id;
                    });

                    setStore({ contactos: contactosModificados }); //modifique el estado de contactos

                    console.log(store);
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
};

export default getState;
