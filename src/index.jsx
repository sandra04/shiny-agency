import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
// on renomme BrowserRouter en "Router" pour plus de facilité
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import Error from './components/Error'
import Footer from './components/Footer'

import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Profile from './pages/Profile'

// On importe le Provider de notre contexte de thème
import {ThemeProvider} from './utils/context'
import {SurveyProvider} from './utils/context'
import GlobalStyle from './utils/styles/GlobalStyle'



const root = ReactDOM.createRoot(document.getElementById('root'))
// Router stocke et s'abonne au changement d'URL de la page courante
// Routes sélectionne le composant enfant <Route/> dont le "path" correspond à l'URL demandée
// Dans "Route", on indique que pour l'url définie dans "path", on souhaite afficher le composant indiqué dans "element"
root.render(
  <React.StrictMode>
    <Router>
      { /* On englobe tout dans notre Provider de thème */ }
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/survey/:questionNumber" element={<Survey/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/freelances" element={<Freelances/>} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* Toutes les routes qui ne sont pas listées ci-dessous mèneront vers notre composant Error */}
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer/>
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
