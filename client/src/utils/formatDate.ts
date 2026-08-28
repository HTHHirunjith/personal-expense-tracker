export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  const currentDayAndTime = `${year}-${month}-${day}T${hours}:${minutes}`
  const firstDayOfMonth = `${year}-${month}-01T00:00:00`
  const currentStartOfDay = `${year}-${month}-${day}T00:00:00`
  const currentDay = isoDateTime
  const currentEndOfDay = `${year}-${month}-${day}T23:59:59`
  const currentMonth = `${year}-${month}`
  const beautifyDate = date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function subDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() - days)
    return result
  }


  return {
    currentMonth,
    currentDayAndTime,
    currentStartOfDay,
    currentEndOfDay,
    currentDay,
    firstDayOfMonth,
    isoDateTime,
    beautifyDate,
    addDays,
    subDays
  }
}