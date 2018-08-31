import http from 'services/http'

export default {
  fetchData () {
    return http.get('/listings/')
      .then(({ data }) => data)
  }
}
