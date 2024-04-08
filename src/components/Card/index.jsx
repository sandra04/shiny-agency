import PropTypes from 'prop-types'
// import { useState } from 'react'
import styled from 'styled-components'

import { useTheme } from '../../utils/hooks'
import colors from '../../utils/styles/colors'
import DefaultPicture from '../../assets/profile.png'


const CardLabel = styled.span`
  color: #5843e4;
  font-size: 18px;
  font-weight: normal;
  padding-left: 15px;
  margin-bottom:20px;
`

const CardTitle = styled.span`
  color: black;
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 100px;
  width: 100px;
  align-self: center;
  border-radius: 50%;
  margin-bottom:20px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  opacity:1;
  border-radius: 30px;
  width:90%;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`


function Card({ label, title, picture }) {
  const { theme } = useTheme()
  // const [isFavorite, setIsFavorite] = useState(false)
  // const star = isFavorite ? '⭐️' : ''

  return (
    <CardWrapper theme={theme}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle theme={theme}>{title}</CardTitle>
    </CardWrapper>
  )
}
// Cette fonction était lancée au clic sur "CardWrapper" pour l'ajout en favoris : onClick={() => setIsFavorite(!isFavorite)}
// On ajoutait également la variable "star" autour du texte du "CardTitle"

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
}

Card.defaultProps = {
    label : '',
    title: '',
    picture: DefaultPicture,
    theme: 'light'
}

export default Card