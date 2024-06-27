import styled from 'styled-components'
import colors from '../../utils/styles/colors'
/*import { useContext } from 'react'
// On importe le contexte de notre thème
import { ThemeContext } from '../../utils/context'*/
import { useTheme } from '../../utils/hooks'


const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    padding-bottom:50px;
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
`


function Footer() {
    const { toggleTheme, theme } = useTheme()

    return (
        <FooterContainer>
            <NightModeButton onClick={() => toggleTheme()}>
                Changer de mode : {theme === 'light' ? '🌙' : '☀️'}
            </NightModeButton>
        </FooterContainer>
    )
}

export default Footer