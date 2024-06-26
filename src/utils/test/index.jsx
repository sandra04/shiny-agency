import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider, SurveyProvider } from '../../utils/context'
import { MemoryRouter } from 'react-router-dom'


function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <SurveyProvider>{children}</SurveyProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

export function render(ui) {
  rtlRender(ui, { wrapper: Wrapper })
}

/*export function render(ui, options) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter {...options}>
        <ThemeProvider>
          <SurveyProvider>{children}</SurveyProvider>
        </ThemeProvider>
      </MemoryRouter>
    )
  }
  rtlRender(ui, { wrapper: Wrapper })
}*/