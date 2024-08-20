import contactDispatcher from './contactDispatcher';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contactos: [], // aqui se almacenaran todos los contactos que vengan de la api
            contacto: {},
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
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
};

export default getState;
