import { TOTAL_CURRENCIES_TO_FETCH } from 'config/app'
import http from 'services/http'

export default {
  fetchData () {
    return http.get(`/ticker/?limit=${TOTAL_CURRENCIES_TO_FETCH}`)
      .then(({ data }) => data.data)
  },
  fetchDataById (id) {
    return http.get(`/ticker/${id}/`)
      .then(({ data }) => data.data)
  }
}
