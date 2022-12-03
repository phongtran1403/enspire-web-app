import { createContext } from "react";

const Context = createContext()

export default Context

export const ContextProvider = ({
    children, ...props
}) => {
    return (
        <Context.Provider
            value={props}
        >
            {children}
        </Context.Provider>
    );
};