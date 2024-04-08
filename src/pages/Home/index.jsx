import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { StyledLink } from '../../utils/styles/Atoms'
import { useTheme } from '../../utils/hooks'
import HomeIllustration from '../../assets/home-illustration.svg'



const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  width:90%;
  margin:0 auto;
`

const HomerContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  width:100%;
  @media (min-width: 1024px) {
      width:80%;
  }
  @media (min-width: 1400px) {
    width:65%;
  }
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
  margin:60px 30px;
`

const StyledTitle = styled.h2`
  padding-bottom: 30px;
  line-height: 1.6em;
  @media (min-width: 768px) {
    font-size:2.4em;
  }
  @media (min-width: 1400px) {
    font-size:3em;
  }
`

const Illustration = styled.img`
  flex: 1;
  width:calc(100% - 60px);
  max-width:500px;
  margin:0 30px;
`



function Home() {
  const { theme } = useTheme()

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink theme={theme}>
            Faire le test
          </StyledLink>
        </LeftCol>
        <Illustration src={HomeIllustration} />
      </HomerContainer>
    </HomeWrapper>
  )
}

export default Home