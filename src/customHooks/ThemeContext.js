//To use in a functionalComponent :
// 1) import {useTheme, useThemeUpdate} from "./ThemeContext.js"
// 2) const darkTheme = useTheme()
// 3) const toggleTheme = useThemeUpdate()   %%%% Can define more functions to be used
// 4) Wrap the component where is called  with <ThemeProvider> <functionalComponent> </ThemeProvider>

import {useContext, useState, createContext} from 'react';

const ThemeContext = createContext();
const UpdateThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(UpdateThemeContext);
}

export function ThemeProvider({children}){
    const [darkTheme, setDarkTheme]= useState(true)
    function toggleTheme(){
        setDarkTheme(prevDarkTheme => !prevDarkTheme )
    }
    return(
        <ThemeContext.Provider value = {darkTheme}>
            <UpdateThemeContext.Provider value ={toggleTheme}>
                {children}
            </UpdateThemeContext.Provider>
        </ThemeContext.Provider>
    )

}