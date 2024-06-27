import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { useTheme } from '../../utils/hooks'


const ProfileWrapper = styled.div`
    width:90%;
    margin:0 auto;
    padding: 90px 0;
    background-color: ${({ theme }) =>
        theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ProfileContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom:50px;
`

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin:0 30px;
    color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
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
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
        ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
`

const Availability = styled.span`
    &:before {
        position: absolute;
        left: 0;
        top: 4px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        background-color: ${props => (props.$available ? 'green' : 'red')};
        content: '';
    }
    padding-left: 20px;
    position: relative;
`

const ContactButton = styled.button`
  padding: 10px 15px;
  color: white;
  border-radius: 30px;
  background-color: #5843E4;
  border: 2px solid #5843E4;
  cursor: pointer;
  font-size: 16px;
`

const BottomLinkWrapper = styled.p`
  text-align: center;
  margin: 80px 0 0;
`


function Profile() {
    const { id: queryId } = useParams()
    const { theme } = useTheme()

    const [profileData, setProfileData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [askedContact, setAskedContact] = useState(false)

    
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
                    {available
                    ? <Availability $available>
                        Disponible maintenant
                    </Availability>
                    : <Availability >
                        Indisponible
                    </Availability>}
                  <Price>{tjm} € / jour</Price>
                  </ProfileDetails>
              </ProfileContainer>
          )}
          <div style={{textAlign:"center"}}>
            {askedContact
              ? <p style={{color:"red"}}>Le site est un template, vous ne pourrez pas contacter le freelance.</p>
              : <ContactButton onClick={()=>setAskedContact(true)}>Contacter le freelance</ContactButton>
              }
          </div>
          <BottomLinkWrapper>
            {theme === "light"
            ? <Link to="/freelances" style={{color:'#000000'}}>Voir les autres freelances</Link>
            : <Link to="/freelances" style={{color: '#ffffff'}}>Voir les autres freelances</Link>
            }
          </BottomLinkWrapper>
      </ProfileWrapper>
    )
}


export default Profile