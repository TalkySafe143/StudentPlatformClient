import React, {useState} from 'react';

export const AppContext = React.createContext({});

export const UserContextWrapper = (props) => {
    const [ user, setUser ] = useState("");

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {props.children}
        </AppContext.Provider>
    );
}