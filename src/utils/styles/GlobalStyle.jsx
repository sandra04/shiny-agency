import { useContext } from 'react'
import { createGlobalStyle } from 'styled-components'

// On importe notre contexte de thème et on précise le Provider auquel il est relié
import { ThemeContext } from '../context'



const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? '#2F2E41' : 'white'};
        margin: 0;
    }
`


function GlobalStyle() {
    const { theme } = useContext(ThemeContext)
    // On récupère le state "theme" pour savoir si le thème actuel est clair ou sombre -> l'affichage change en fonction avec le "styled-component"
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
    
}

export default GlobalStyle