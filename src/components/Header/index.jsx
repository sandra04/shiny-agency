import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/styles/Atoms'
import DarkLogo from '../../assets/dark-logo.png'


const HomeLogo = styled.img`
  height: 70px;
  @media (max-width:538px){
    margin-bottom:40px;
  }
`

const NavContainer = styled.nav`
  width:90%;
  margin:30px auto 60px;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width:538px){
    justify-content:center;
  }
`


function Header() {
    return (
        <NavContainer>
        <Link to="/">
          <HomeLogo src={DarkLogo} />
        </Link>
        <div>
          <StyledLink to="/">Accueil</StyledLink>
          <StyledLink to="/freelances">Profils</StyledLink>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </div>
      </NavContainer>
    )
}

export default Header