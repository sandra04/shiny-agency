import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import { Loader } from '../../utils/styles/Atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'


const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:90%;
  margin:0 auto;
  color: ${({ theme }) => theme === 'light' ? "black" : "white"};
`

const QuestionTitle = styled.h2`
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
const SurveyLink = styled(Link)`
  color: ${({ theme }) => theme === 'light' ? "black" : "white"}!important;
`

const ReplyBox = styled.button`
border: none;
height: 100px;
width:calc(50% - 30px);
max-width: 300px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${colors.backgroundLight};
border-radius: 30px;
cursor: pointer;
box-shadow: ${(props) =>
  props.isSelected ? `0px 0px 0px 4px ${colors.primary} inset` : 'none'};
&:first-child {
  margin-right: 15px;
}
&:last-of-type {
  margin-left: 15px;
}
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content:center;
`



function Survey() {
    
  const { theme } = useTheme()

  // Récupère le numéro de question indiqué dans l'URL du navigateur
  const { questionNumber } = useParams()

  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data

  // Les réponses que l'utilisateur a déjà données (s'il y en a)
  const { answers, saveAnswers } = useContext(SurveyContext)
  

  function saveReply(answer) {
      saveAnswers({ [questionNumber]: answer })
  }

  
  const questionsTotal = surveyData ? parseInt(Object.keys(surveyData).length) : undefined
  


  if (error) {
      return <span>Oups, il y a eu un problème</span>
  }

  return (
      <SurveyContainer theme={theme}>
          <h1>Questionnaire 🧮</h1>
          { questionNumberInt <= questionsTotal && <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle> }
          {isLoading ? (
              <Loader />
          ) : (
              surveyData && questionNumberInt <= questionsTotal && <QuestionContent theme={theme}>{surveyData[questionNumberInt]}</QuestionContent>
          )}
          {/* Sauvegarde les réponses avec le numéro de question associé -> la fonction locale "saveReply" appelle la fonction "saveAnswers" du Provider */}
          {/* 1er bouton : Prop "isSelected" en true si on a déjà répondu oui à la question affichée / 2ème bouton : Idem si on a déjà répondu non */}
          { answers && !isLoading && questionNumberInt <= questionsTotal &&
              <ReplyWrapper>
                  <ReplyBox 
                  onClick={() => saveReply(true)}
                  isSelected={answers[questionNumber] === true}
                  theme={theme}
                  >
                  Oui
                  </ReplyBox>
                  <ReplyBox
                  onClick={() => saveReply(false)}
                  isSelected={answers[questionNumber] === false}
                  theme={theme}
                  >
                  Non
                  </ReplyBox>
              </ReplyWrapper>
          }
          <LinkWrapper theme={theme}>
              { questionNumberInt > 1 && questionNumberInt <= questionsTotal &&<SurveyLink to={`/survey/${prevQuestionNumber}`} theme={theme}>Précédent</SurveyLink> }
              <br/>
              { questionNumberInt < questionsTotal && <SurveyLink to={`/survey/${nextQuestionNumber}`} theme={theme}>Suivant</SurveyLink> }
              { questionNumberInt === questionsTotal && <SurveyLink to="/results" theme={theme}>Résultats</SurveyLink> }
              { !isLoading && questionNumberInt > questionsTotal && <div><p>Il n'existe pas de question {questionNumber} dans ce questionnaire</p><SurveyLink to="/survey/1" theme={theme}>Retourner au questionnaire</SurveyLink></div> }
          </LinkWrapper>
      </SurveyContainer>
  )
}

export default Survey