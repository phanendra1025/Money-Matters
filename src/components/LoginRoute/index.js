import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = id => {
    Cookies.set('user_id', id, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitTheForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
      },
    }
    const response = await fetch(
      `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`,
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const userData = {
        getUserId: data.get_user_id,
      }
      const userId = userData.getUserId[0].id
      this.onSubmitSuccess(userId)
    } else {
      this.setState({errorMessage: 'enter valid Details'})
    }
  }

  render() {
    const {email, password, errorMessage} = this.state
    const userId = Cookies.get('user_id')
    if (userId !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690619700/MONEYMATTERS/43Z_2107.w010.n001.5B.p8.5_ezc9mv.jpg"
          className="login-image"
          alt="login"
        />
        <form className="login-form" onSubmit={this.submitTheForm}>
          <div className="webiste-logo-container">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690620128/MONEYMATTERS/Group_1_eodscj.png"
              alt="webiste logo"
              className="login-website-logo"
            />
            <h1 className="login-webiste-name">
              MONEY <span className="login-website-span"> MATTERS</span>
            </h1>
          </div>
          <div className="inputs-container username-input-container">
            <label className="input-labels" htmlFor="email">
              email
            </label>
            <input
              value={email}
              className="login-inputs"
              id="email"
              type="text"
              placeholder="Enter the email"
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="inputs-container">
            <label className="input-labels" htmlFor="password">
              Password
            </label>
            <input
              className="login-inputs"
              id="password"
              type="password"
              placeholder="Enter the password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <p className="login-error-message">{errorMessage}</p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute
