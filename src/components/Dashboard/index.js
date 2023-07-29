import {Component} from 'react'
import SideNavbar from '../SideNavbar'
import './index.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <SideNavbar />
      </div>
    )
  }
}

export default Dashboard
