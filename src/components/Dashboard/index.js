import {Component} from 'react'

import SideNavbar from '../SideNavbar'
import './index.css'
import MoneyMatterContext from '../../Context/MoneyMattersContext'

import Transaction from '../Transactions'
import Accounts from '../Accounts'

class Dashboard extends Component {
  renderAccounts = () => <Accounts />

  renderTransactions = () => <Transaction />

  renderAllViews = id => {
    switch (id) {
      case 'HOME':
        return this.renderAccounts()
      case 'TRANSACTIONS':
        return this.renderTransactions()
      default:
        return null
    }
  }

  render() {
    return (
      <MoneyMatterContext.Consumer>
        {value => {
          const {activeOptionId} = value
          return (
            <div className="dashboard-container">
              <SideNavbar />
              {this.renderAllViews(activeOptionId)}
            </div>
          )
        }}
      </MoneyMatterContext.Consumer>
    )
  }
}

export default Dashboard
