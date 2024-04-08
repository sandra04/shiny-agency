import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import '@testing-library/jest-dom/extend-expect'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/test'
import Freelances from './'


const freelancersMockedData = [
  {
    name: 'Eric Forman',
    job: 'Développeur fullstack',
    picture: '',
  },
  {
    name: 'Mickael Kelso',
    job: 'Développeur backend',
    picture: '',
  },
]


const server = setupServer(
  // URL qu'il faudra intercepter
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // On passe les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active simulation d'API avant les tests
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display freelancers names after loader is removed', async () => {
  render(<Freelances />)

  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
  expect(screen.getByText('Eric Forman')).toBeInTheDocument()
  expect(screen.getByText('Mickael Kelso')).toBeInTheDocument()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
})