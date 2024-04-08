/* Utilisé si composant classe
import { Component } from 'react'*/
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

import { Loader } from '../../utils/styles/Atoms'
/* Utilisé pour le composant classe (car n'utilise pas le hook)
import { ThemeContext } from '../../utils/context'*/
import { useState, useEffect } from 'react'
import { useTheme } from '../../utils/hooks'
// useFetch ?

const ProfileWrapper = styled.div`
    width:90%;
    margin:0 auto;
    background-color: ${({ theme }) =>
        theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ProfileContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 90px 0;
`

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin:0 30px;
    color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
    @media (max-width: 500px) {
        margin-top:30px;
        align-items:center;
    }
`

const Picture = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 75px;
    margin:0 30px;
`

const Title = styled.h1`
    font-size: 25px;
    margin: 0;
    font-weight: 500;
`

const JobTitle = styled.h2`
    padding-top: 10px;
    font-size: 20px;
    margin: 0;
    font-weight: 500;
`

const Location = styled.span`
    margin-left: 15px;
    color: ${colors.secondary};
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Price = styled.span`
    padding-top: 10px;
    font-weight: 500;
    font-size: 20px;
`

const SkillsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
`

const Skill = styled.span`
    border-radius: 5px;
    padding: 5px;
    margin-right: 5px;
    border: 1px solid
        ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Availability = styled.span`
    &:before {
        position: absolute;
        left: 0;
        top: 4px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        background-color: ${({ available }) => (available ? 'green' : 'red')};
        content: '';
    }
    padding-left: 20px;
    position: relative;
`



function Profile() {
    const { id: queryId } = useParams()
    const { theme } = useTheme()

    //const { data, isLoading, error } = useFetch(`http://localhost:8000/freelance?id=${queryId}`)

    const [profileData, setProfileData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        async function fetchProfile() {
            setLoading(true)
      
            try{
              const response = await fetch(`http://localhost:8000/freelance?id=${queryId}`)
              const { freelanceData } = await response.json()
              setProfileData(freelanceData)
            }
            catch(err){
              console.log(err)
              setError(true)
            }
            finally{
              setLoading(false)
            }
        }
        fetchProfile()
    }, [queryId])


    // Le "?" permet de vérifier que "data" existe bien
    // Plus d'infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    //const profileData = data?.freelanceData

    const {
        picture,
        name,
        location,
        tjm,
        job,
        skills,
        available,
        id
    } = profileData

    if (error) {
        return <span>Oups, il y a eu un problème</span>
    }

    return (
        <ProfileWrapper theme={theme}>
            {isLoading ? (
                <Loader theme={theme} />
            ) : (
                profileData && <ProfileContainer>
                    <Picture src={picture} alt={name} height={150} width={150} />
                    <ProfileDetails theme={theme}>
                    <TitleWrapper>
                        <Title>{name}</Title>
                        <Location>{location}</Location>
                    </TitleWrapper>
                    <JobTitle>{job}</JobTitle>
                    <SkillsWrapper>
                        {skills &&
                        skills.map((skill) => (
                            <Skill key={`skill-${skill}-${id}`} theme={theme}>
                            {skill}
                            </Skill>
                        ))}
                    </SkillsWrapper>
                    <Availability available={available}>
                        { available ? 'Disponible maintenant' : 'Indisponible' }
                    </Availability>
                    <Price>{tjm} € / jour</Price>
                    </ProfileDetails>
                </ProfileContainer>
            )}
        </ProfileWrapper>
    )
}

/* Composant au format class
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileData: {},
    }
  }

  componentDidMount() {
    const { id } = this.props

    fetch(`http://localhost:8000/freelance?id=${id}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({ profileData: jsonResponse?.freelanceData })
      })
  }

  render() {
    const { profileData } = this.state
    const {
      picture,
      name,
      location,
      tjm,
      job,
      skills,
      available,
      id,
    } = profileData
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ProfileWrapper theme={theme}>
            <Picture src={picture} alt={name} height={150} width={150} />
            <ProfileDetails theme={theme}>
              <TitleWrapper>
                <Title>{name}</Title>
                <Location>{location}</Location>
              </TitleWrapper>
              <JobTitle>{job}</JobTitle>
              <SkillsWrapper>
                {skills &&
                  skills.map((skill) => (
                    <Skill key={`skill-${skill}-${id}`} theme={theme}>
                      {skill}
                    </Skill>
                  ))}
              </SkillsWrapper>
              <Availability available={available}>
                {available ? 'Disponible maintenant' : 'Indisponible'}
              </Availability>
              <Price>{tjm} € / jour</Price>
            </ProfileDetails>
          </ProfileWrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}*/


export default Profile