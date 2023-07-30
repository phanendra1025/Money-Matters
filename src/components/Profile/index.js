import {Component} from 'react'
import {BiPlus} from 'react-icons/bi'
import './index.css'

class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-header-section">
          <h1 className="profile-heading">Profile</h1>
          <button type="button" className="add-transaction-button">
            <BiPlus size="20px" color="#ffffff" />
            Add Transaction
          </button>
        </div>
      </div>
    )
  }
}

export default Profile
