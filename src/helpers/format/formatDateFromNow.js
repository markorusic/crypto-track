import moment from 'moment'

export default (value) => moment(value).startOf('minute').fromNow()
