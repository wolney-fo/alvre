import lib from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

lib.extend(localizedFormat)
lib.extend(utc)
lib.extend(timezone)

lib.tz.setDefault('America/Sao_Paulo')

export const dayjs = lib
