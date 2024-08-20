import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const Agenda = () => {
    const { actions, store } = useContext(Context);
    useEffect(() => {
        actions.getContactList();
    }, []);
    return (
        <ul>
            {' '}
            {store.contactList.map((contact) => {
                return <li>{contact.name}</li>;
            })}
        </ul>
    );
};

export default Agenda;
