import { TOTAL_CURRENCIES_SHOWN } from 'config/app'
import http from 'services/http'

export default {
  fetchData () {
    return http.get(`/ticker/?limit=${TOTAL_CURRENCIES_SHOWN}`)
      .then(({ data }) => data.data)
  },
  fetchDataById (id) {
    return http.get(`/ticker/${id}/`)
      .then(({ data }) => data.data)
  }
}
