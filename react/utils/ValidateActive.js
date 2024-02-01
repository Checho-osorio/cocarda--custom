
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'


dayjs.extend(isBetween)

const ValidateActive = (InitialDate, FinalDate) => {
  const currentDate = dayjs()
  const startDate = dayjs(InitialDate)
  const endDate = dayjs(FinalDate)



 return currentDate.isBetween(startDate, endDate, 'ms', '[]')
}

export default ValidateActive
