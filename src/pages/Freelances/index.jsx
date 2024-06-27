import { useState, useEffect } from 'react'
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
  color: ${({ theme }) => theme === 'light' ? "black" : "white"};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme === 'light' ? colors.secondary : "white"};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const Filter = styled.form`
  margin: 0 auto 30px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: ${({ theme }) => theme === 'light' ? "black" : "white"};
`

const FilterPart = styled.div`
  width: 50%;
  min-width: 280px;
  max-width: 500px;
  margin-bottom:30px;
`

const AvailabilityFilter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 10px 0;
  padding: 0;
`

const AvailabilityOption = styled.li`
  padding: 0 10px;
`


function Freelances() {

  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(`http://localhost:8000/freelances`)
  const [freelanceFilters, setFreelanceFilters] = useState({location:"", available: true})
  const [filteredList, setFilteredList] = useState(null)


  // Le "?" permet de vérifier que "data" existe bien
  // Plus d'infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const freelancersList = data?.freelancersList
  
  useEffect(() => {
    if (freelancersList) {
      setFilteredList(filterFreelances())
    }
  }, [freelanceFilters])

  let cities = []
  freelancersList?.map((freelance) => {
    if (!cities.includes(freelance.location)){
      cities.push(freelance.location)
    }
    return cities
  })


  function filterByLocation(city){
    let filters = {...freelanceFilters}
    filters.location = city
    setFreelanceFilters({...filters})
  }

  function filterByAvailability(availability){
    let filters = {...freelanceFilters}
    let availabilityToBoolean = ""
    if (availability !== "") {
      availabilityToBoolean = (availability === "true")
    }
    filters.available = availabilityToBoolean
    setFreelanceFilters({...filters})
  }

  function filterFreelances() {
    let filteredByLocation
    let filteredByAvailability

    if (freelanceFilters.location !== "") {
      filteredByLocation = freelancersList?.filter((freelance) => freelance.location === freelanceFilters.location)
    }
    else {
      filteredByLocation = [...freelancersList]
    }

    if (freelanceFilters.available !== "") {
      filteredByAvailability = filteredByLocation?.filter((freelance) => freelance.available === freelanceFilters.available)
    }
    else {
      filteredByAvailability = [...filteredByLocation]
    }
    return filteredByAvailability
  }


  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <FreelancesWrapper>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      <Filter onSubmit={e => e.preventDefault()} theme={theme}>
        <FilterPart>
          <label htmlFor="location-select" style={{display:"block", marginBottom:"10px"}}>Lieu : </label>
          <select name="location" id="location-select" style={{width: "250px"}} value={freelanceFilters.location} onChange={(e) => filterByLocation(e.target.value)}>
            <option value="">Tout</option>
            {cities?.map((city, index) => <option key={index} value={city}>{city}</option>)}
          </select>
        </FilterPart>
        <FilterPart>
          <legend>Disponibilité actuelle :</legend>
          <AvailabilityFilter>
            <AvailabilityOption>
              <label htmlFor="true">Disponible</label>
              <input type="radio" id="true" name="availability" value="true" checked={freelanceFilters.available === true} onChange={(e) => filterByAvailability(e.target.value)} />
            </AvailabilityOption>
            <AvailabilityOption>
              <label htmlFor="false">Non disponible</label>
              <input type="radio" id="false" name="availability" value="false" checked={freelanceFilters.available === false} onChange={(e) => filterByAvailability(e.target.value)}/>
            </AvailabilityOption>
            <AvailabilityOption>
              <label htmlFor="all">Tous</label>
              <input type="radio" id="all" name="availability" value="" checked={freelanceFilters.available === ""} onChange={(e) => filterByAvailability(e.target.value)} />
            </AvailabilityOption>
          </AvailabilityFilter>
        </FilterPart>
      </Filter>
      {isLoading ? (
          <Loader theme={theme} />
      ) : (
        filteredList ? <CardsContainer>
          {filteredList?.map(({id, name, job, picture, available}) => (
            <Link key={`freelance-${id}`} to={`/profile/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card
                label={job}
                title={name}
                picture={picture}
                available={available.toString()}
              />
            </Link>
          ))}
        </CardsContainer>
        :
        <CardsContainer>
          {freelancersList?.map(({id, name, job, picture, available}) => (
            <Link key={`freelance-${id}`} to={`/profile/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card
                label={job}
                title={name}
                picture={picture}
                available={available.toString()}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </FreelancesWrapper>
  )
}

export default Freelances
