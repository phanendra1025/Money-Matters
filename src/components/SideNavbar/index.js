import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {BsPersonFill} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const profileApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class SideNavbar extends Component {
  state = {
    userDetails: [],
    userDetailsApiStatus: profileApiConstants.initial,
  }

  componentDidMount() {
    this.getTheUserDetails()
  }

  getTheUserDetails = async () => {
    this.setState({userDetailsApiStatus: profileApiConstants.inProcess})
    const id = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${id}`,
      },
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/profile',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        userDetails: data.users[0],
        userDetailsApiStatus: profileApiConstants.success,
      })
    }
  }

  logout = () => {
    console.log('logout')
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderSuccessUserDetailsView = () => {
    const {userDetails} = this.state
    const {name, email} = userDetails
    console.log(userDetails)
    return (
      <div className="details-container">
        <img
          src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690642750/MONEYMATTERS/17004_aepcmr.png"
          alt="profile"
          className="side-navbar-profile-image"
        />
        <div className="side-bar-profile-details">
          <p className="user-name">{name}</p>
          <p className="user-email">{email}</p>
        </div>
        <button type="button" onClick={this.logout} className="logout-button">
          <FiLogOut size="20px" className="logout-icon" color="#718EBF" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderbottomView = () => {
    const {userDetailsApiStatus} = this.state
    switch (userDetailsApiStatus) {
      case profileApiConstants.success:
        return this.renderSuccessUserDetailsView()
      case profileApiConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <nav className="side-nav-bar-container">
        <div className="side-nav-bar-top-section">
          <div className="website-logo-and-name-container">
            <img
              className="side-navbar-website-logo"
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690620128/MONEYMATTERS/Group_1_eodscj.png"
              alt="webiste logo"
            />
            <h1 className="website-name">
              Money <span className="website-span-name"> Matters</span>
            </h1>
          </div>
          <ul className="side-options-container">
            <li className="option-item">
              <AiFillHome size="25px" color="#5B73A0" />
              <p className="option-name">Dashboard</p>
            </li>
            <li className="option-item">
              <img
                src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690633980/MONEYMATTERS/transfer_1_nidoci.jpg"
                alt="icon"
              />
              <p className="option-name">Transcations</p>
            </li>
            <li className="option-item">
              <BsPersonFill color="#5B73A0" size="25px" />
              <p className="option-name">Profile</p>
            </li>
          </ul>
        </div>
        <div className="side-navbar-bottom-section">
          {this.renderbottomView()}
        </div>
      </nav>
    )
  }
}

export default withRouter(SideNavbar)
