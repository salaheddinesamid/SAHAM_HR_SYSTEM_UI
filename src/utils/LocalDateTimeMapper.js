
export const LocalDateTimeMapper = (dateTime)=>{
    const date = dateTime?.split('T')[0]
    const time = dateTime?.split('T')[1]
    const clearTime = time?.split('.')[0]

    return `Le ${date} à ${clearTime}`
}