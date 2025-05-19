import { formatDate } from '@/utils/dateFormatter'

describe('formatDate utility', () => {
  it('formats date correctly', () => {
    expect(formatDate('2023-09-15T00:00:00.000Z')).toBe('15-09-2023')
  })

  it('handles different date formats', () => {
    expect(formatDate('2023-12-31T23:59:59.999Z')).toBe('31-12-2023')
    expect(formatDate('2023-01-01T00:00:00.000Z')).toBe('01-01-2023')
  })

  it('handles empty or invalid input', () => {
    expect(formatDate('')).toBe('')
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})
