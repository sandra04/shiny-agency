import Card from './'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'


describe('Card', () => {
    test('should render title and image', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Eric Forman"
                    label="Développeur fullstack"
                    picture="/myPicture.jpg"
                />
            </ThemeProvider>

        )
        const cardPicture = screen.getByRole('img')
        expect(cardPicture.src).toBe('http://localhost/myPicture.jpg');

        const cardTitle = screen.getByText(/Eric/i)
        expect(cardTitle.textContent).toBe('Eric Forman')
    })

    /*test('should add ⭐️ around the title', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Eric Forman"
                    label="Développeur fullstack"
                    picture="/myPicture.jpg"
                />
            </ThemeProvider>
        )
        const cardTitle = screen.getByText(/Eric/i)
        const card = cardTitle.closest('div')
        expect(cardTitle.textContent).toBe('Eric Forman')
        fireEvent.click(card)
        expect(cardTitle.textContent).toBe('⭐️Eric Forman⭐️')
    })*/
})