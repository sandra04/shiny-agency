import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context'


// On passe en paramètre l'URL de l'API qu'on veut appeler
export function useFetch(url) {

    // State interne qui permet de stocker la data
    const [data, setData] = useState({})
    // State interne qui permet de savoir si la data est en train de charger
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    // Hook utilisé pour faire l'appel à l'API
    // -> Le tableau de dépendance indique qu'on lance sa callback à chaque changement de l'URL passée en paramètres
    useEffect(() => {
        // Return vide si le paramètre de l'URL est vide
        if (!url) return
        
        // Passe "isLoading" à "true" pour informer que les data chargent
        setLoading(true)

        // Déclare la fonction asynchrone "fetchData" qui permet d'appeler fetch, parser la réponse retournée et changer l'état de "isLoading"
        async function fetchData() {
            try{
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            }
            catch(err){
                console.log(err)
                setError(true)
            }
            finally{
                setLoading(false)
            }
        }
        
        fetchData()
    }, [url])

    return { isLoading, data, error }

}




export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}