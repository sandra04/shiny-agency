//import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'



const FreelancesWrapper = styled.div`
  padding:0 0 80px;
  width:90%;
  margin:0 auto;
`
//   grid-template-rows: 300px;
const CardsContainer = styled.div`
  width:90%;
  max-width:1200px;
  margin:0 auto;
  display: grid;
  gap: 24px;
  align-items: center;
  justify-items: center;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`



function Freelances() {

  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(`http://localhost:8000/freelances`)
  // Le "?" permet de vérifier que "data" existe bien
  // Plus d'infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const freelancersList = data?.freelancersList

  /*const [freelancesList, setFreelancesList] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFreelances() {
      setDataLoading(true)

      try{
        const response = await fetch(`http://localhost:8000/freelances`)
        // freelancersList est une propriété de l'objet retourné par fetch (on destructure pour le récupérer -> avec syntaxe {})
        // On parse la réponse avec "response.json()"
        const { freelancersList } = await response.json()
        setFreelancesList(freelancersList)
      }
      catch(err){
        console.log(err)
        setError(true)
      }
      finally{
        setDataLoading(false)
      }
    }
      fetchFreelances()
  }, [])*/


  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <FreelancesWrapper>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
          <Loader theme={theme} />
      ) : (
        freelancersList && <CardsContainer>
          {freelancersList?.map(({id, name, job, picture}) => (
            <Link key={`freelance-${id}`} to={`/profile/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card
                label={job}
                title={name}
                picture={picture}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </FreelancesWrapper>
  )
}
// Avant l'ajout de "Link", il y avait une key sur le composant "Card" ({name-id})

export default Freelances
