export const formatDate = (date: string) => {
  const dt = new Date(date)
  const df = Intl.DateTimeFormat([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
  return df.format(dt)
}