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
  props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
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

  /*const [surveyData, setSurveyData] = useState({})
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(null)*/
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data

  // Les réponses que l'utilisateur a déjà données (s'il y en a)
  const { answers, saveAnswers } = useContext(SurveyContext)
  

  function saveReply(answer) {
      saveAnswers({ [questionNumber]: answer })
  }

  /*useEffect(() => {
      setDataLoading(true)
      fetch(`http://localhost:8000/survey`)
          .then((response) => response.json()
              .then(({ surveyData }) => {
                  setSurveyData(surveyData)
                  setDataLoading(false)
          })
              .catch((err) => {
                  console.log(err)
                  setError(true)
                  setDataLoading(false)
              })
          )
  }, [])*/

  
  const questionsTotal = surveyData ? parseInt(Object.keys(surveyData).length) : undefined
  

  /* Cette syntaxe permet aussi de faire des calls API.
  La fonction passée à useEffect ne peut pas être asynchrone, elle ne peut donc pas être directement appelée dans les arguments.


  useEffect(() => {
      async function fetchSurvey() {
          setDataLoading(true)

          try{
              const response = await fetch(`http://localhost:8000/survey`)
              // SurveyData est une propriété de l'objet retourné par fetch (on destructure pour le récupérer -> avec syntaxe {})
              // On parse la réponse avec "response.json()"
              const { surveyData } = await response.json()
              setSurveyData(surveyData)
          }
          catch(err){
              console.log(err)
              setError(true)
          }
          finally{
              setDataLoading(false)
          }
      }
      fetchSurvey()
  }, [])
  */

  if (error) {
      return <span>Oups, il y a eu un problème</span>
  }

  return (
      <SurveyContainer>
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
              { questionNumberInt > 1 && questionNumberInt <= questionsTotal &&<Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link> }
              <br/>
              { questionNumberInt < questionsTotal && <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link> }
              { questionNumberInt === questionsTotal && <Link to="/results">Résultats</Link> }
              { !isLoading && questionNumberInt > questionsTotal && <div><p>Il n'existe pas de question {questionNumber} dans ce questionnaire</p><Link to="/survey/1">Retourner au questionnaire</Link></div> }
          </LinkWrapper>
      </SurveyContainer>
  )
}

export default Survey