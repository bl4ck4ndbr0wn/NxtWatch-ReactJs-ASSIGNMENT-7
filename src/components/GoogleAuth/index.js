import Cookies from 'js-cookie'
import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import {ErrorMessage, GoogleButtonContainer} from './styledComponents'

const GoogleAuth = () => {
  const history = useHistory()
  const [error, setError] = useState('')

  const onSuccess = response => {
    try {
      const decoded = jwtDecode(response.credential)

      if (!decoded) {
        throw new Error('Failed to decode token')
      }

      Cookies.set('jwt_token', response.credential, {
        expires: 30,
        path: '/',
      })

      Cookies.set('user_info', JSON.stringify(decoded), {
        expires: 30,
        path: '/',
      })

      history.replace('/')
    } catch (err) {
      setError('Authentication failed. Please try again.')
      console.error('Google Auth Error:', err)
    }
  }

  const onError = () => {
    setError('Login Failed. Please try again.')
    console.error('Google Login Failed')
  }

  return (
    <GoogleButtonContainer>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={false}
        theme="filled_black"
        auto_select={false}
        text="signin_with"
        shape="rectangular"
        size="large"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </GoogleButtonContainer>
  )
}

export default GoogleAuth
