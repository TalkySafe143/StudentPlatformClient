import React, {useState} from 'react';

const user = localStorage.getItem('user');
const setUser = (value) => {
    localStorage.setItem('user', value);
}

export const AppContext = React.createContext({ user, setUser });

export const UserContextWrapper = (props) => {

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {props.children}
        </AppContext.Provider>
    );
}