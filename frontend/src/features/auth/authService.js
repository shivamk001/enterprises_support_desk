import axios from 'axios'

//endpoint for auth stuff
const API_URL = 'http://localhost:8000/api/users'

// Register user
const register = async (userData) => {
  console.log('USERDATA:', userData)
  const response = await axios.post(API_URL, userData)
  console.log('Response data:', response);
  if (response.data) {
    try {
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log('LocalStorage done')
    }
    catch {
      console.log('LOCAL')
    }
  }
  return response.data
}

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)


  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//logout user
const logout = () => {
  console.log("LocalStorage getitem1:", localStorage.getItem('user'))
  localStorage.removeItem('user')
  console.log("LocalStorage getitem2:", localStorage.getItem('user'))
}

const authService = {
  register,
  login,
  logout,
}
export default authService