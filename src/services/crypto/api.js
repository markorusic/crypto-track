import http from 'services/http'

export default {
  fetchData () {
    return http.get('/ticker/')
      .then(({ data }) => data)
  }
}
