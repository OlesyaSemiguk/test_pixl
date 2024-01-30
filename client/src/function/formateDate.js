export const formateDate = (date) => {
  const myDate = new Date(date * 1000)
  const year = myDate.getFullYear()
  const month = String(myDate.getMonth() + 1).padStart(2, '0')
  const day = String(myDate.getDate()).padStart(2, '0')
  const hours = String(myDate.getHours()).padStart(2, '0')
  const minutes = String(myDate.getMinutes()).padStart(2, '0')
  const seconds = String(myDate.getSeconds()).padStart(2, '0')

  const formattedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
  return formattedDate
}

export const formatDateTime = (date) => {
  const myDate = new Date(date * 1000)
  const hours = String(myDate.getHours()).padStart(2, '0')
  const minutes = String(myDate.getMinutes()).padStart(2, '0')
  const seconds = String(myDate.getSeconds()).padStart(2, '0')
  const formattedDate = `${hours}:${minutes}:${seconds} `
  return formattedDate
}
