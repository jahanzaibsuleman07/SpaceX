import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react'
import PaginatedPage from '../../pages/page/[page]'

// Create mock push function outside to maintain reference
const mockPush = jest.fn()

// Mock next/router with consistent push reference
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: mockPush,
    isReady: true
  })
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />
}))

// Mock axios with proper pagination data
jest.mock('axios', () => ({
  post: jest.fn(() => 
    Promise.resolve({
      data: {
        docs: Array(20).fill(null).map((_, index) => ({
          id: `${index + 1}`,
          name: `Mission ${index + 1}`,
          date_utc: '2023-01-01T00:00:00.000Z',
          success: true,
          details: `Test mission ${index + 1}`,
          links: { patch: { small: 'patch1.png' } }
        }))
      }
    })
  )
}))

describe('PaginatedPage', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  afterEach(cleanup)

  it('renders the correct number of launches per page', async () => {
    render(<PaginatedPage />)
    
    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(9)
    }, { timeout: 3000 })
  })

  it('displays launch information correctly', async () => {
    render(<PaginatedPage />)

    await waitFor(() => {
      expect(screen.getByText('Mission 1')).toBeInTheDocument()
      expect(screen.getAllByText(/Date:/)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/Launch Status:/)[0]).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('handles pagination navigation correctly', async () => {
    render(<PaginatedPage />)

    // Wait for initial render and data
    await waitFor(() => {
      expect(screen.getByText('Mission 1')).toBeInTheDocument()
    })

    // Click Next button
    const nextButton = screen.getByRole('button', { name: 'Next' })
    fireEvent.click(nextButton)

    // Verify navigation
    expect(mockPush).toHaveBeenCalledWith('/page/2')
  })

})
