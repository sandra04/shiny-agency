import { createContext } from 'react'
import { useState } from 'react'


// On initialise le contexte
export const ThemeContext = createContext()

// On crée le Provider lié à notre contexte (il wrappera le plus haut composant parent des Composants qui ont besoin d'accéder aux données gérées ici)
// Il permet de gérer le state qui sera partagé aux enfants qui "se branchent" sur le contexte "ThemeContext"
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        // Le state de "theme" et la fonction pour le modifier sont passés dans les values
        // Tous les composants enfants englobés dans le Provider pourront ainsi accéder à "theme" et "setTheme"
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}



export const SurveyContext = createContext()

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({})
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers })
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}