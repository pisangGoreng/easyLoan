// import {create} from 'apisauce'
import apisauce from 'apisauce'

// const base = 'https://my-json-server.typicode.com/pisangGoreng/easyLoanDb'
const base = 'https://api.jsonbin.io/b'
const secretKey = '$2a$10$dnQNmvll0WEC97xPIky4H.P.8MUdyqeRFcdBX5XK7Lo6G5kFuKSCi'
// $2a$10$0eDaRYUtIq3mgWMmF2G9ZOVwQ63ggOm3xt.mlvnSguSV/3yN42ZvO

const create = (baseURL = base) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'secret-key': secretKey
    },
    timeout: 10000
  })

  const validate = () => {
    return api.get('/5aa0019fcfa05f3aa3aacf12/2') // profile
  }

  return {
    validate
  }
}

export default {
  create
}