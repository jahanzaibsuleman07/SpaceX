import { render } from '@testing-library/react'
import Home from '../pages/index'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Home', () => {
  it('redirects to first page', () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock
    }))

    render(<Home />)
    expect(pushMock).toHaveBeenCalledWith('/page/1')
  })
})
