describe('Date formatting', () => {
  const formattedDate = (date) => date.slice(0, 10).split('-').reverse().join('-')

  it('formats date correctly', () => {
    expect(formattedDate('2023-09-15T00:00:00.000Z')).toBe('15-09-2023')
  })

  it('handles different date formats', () => {
    expect(formattedDate('2023-12-31T23:59:59.999Z')).toBe('31-12-2023')
    expect(formattedDate('2023-01-01T00:00:00.000Z')).toBe('01-01-2023')
  })
})
