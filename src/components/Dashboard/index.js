import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiPlus} from 'react-icons/bi'
import SideNavbar from '../SideNavbar'
import './index.css'
import LastTransactionItem from '../LastTransactionItem'
import OverviewGraph from '../OverviewGraph'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Dashboard extends Component {
  state = {
    creditSum: 0,
    debitSum: 0,
    transactionData: [],
    getTotalsApiStatus: APIConstants.initial,
    getTransactionApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheTotalCreditsAndDebits()
    this.getTheLastTransactionDetails()
  }

  getTheTotalCreditsAndDebits = async () => {
    this.setState({getTotalsApiStatus: APIConstants.inProcess})
    const userId = Cookies.get('user_id')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${userId}`,
      },
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        totalsCreditDebitTransactions: data.totals_credit_debit_transactions,
      }
      if (updatedData.totalsCreditDebitTransactions.length === 3) {
        const creditsTotal = updatedData.totalsCreditDebitTransactions[0].sum
        const debitTotal = updatedData.totalsCreditDebitTransactions[2].sum
        this.setState({creditSum: creditsTotal, debitSum: debitTotal})
      }
      this.setState({getTotalsApiStatus: APIConstants.success})
    }
  }

  getTheLastTransactionDetails = async () => {
    this.setState({getTransactionApiStatus: APIConstants.inProcess})
    const userId = Cookies.get('user_id')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': `${userId}`,
      },
    }
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0',
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        transactions: data.transactions,
      }
      const updateTransactions = updatedData.transactions.map(
        eachTransaction => ({
          amount: eachTransaction.amount,
          category: eachTransaction.category,
          date: eachTransaction.date,
          id: eachTransaction.id,
          transactionName: eachTransaction.transaction_name,
          type: eachTransaction.type,
          userId: eachTransaction.user_id,
        }),
      )
      this.setState({
        transactionData: updateTransactions,
        getTransactionApiStatus: APIConstants.success,
      })
    }
  }

  renderCreditAndDebitCardsSuccessView = () => {
    const {creditSum, debitSum} = this.state
    return (
      <div className="credit-and-debit-wrapper">
        <div className="dashboard-money-details-card">
          <div className="money-details-wrapper">
            <h1 className="credited-money">${creditSum}</h1>
            <p className="transaction-type">Credit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690686691/MONEYMATTERS/Group_2_kafhn3.png"
            alt="credit"
            className="dashboard-credit-image"
          />
        </div>
        <div className="dashboard-money-details-card">
          <div className="money-details-wrapper">
            <h1 className="debited-money">${debitSum}</h1>
            <p className="transaction-type">Debit</p>
          </div>
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690687351/MONEYMATTERS/Group_3_bvywop.png"
            alt="debit"
            className="dashboard-debit-image"
          />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderCreditAndDebitCards = () => {
    const {getTotalsApiStatus} = this.state
    switch (getTotalsApiStatus) {
      case APIConstants.success:
        return this.renderCreditAndDebitCardsSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLastTransactionSuccessView = () => {
    const {transactionData} = this.state
    console.log(transactionData)
    return (
      <div className="last-transaction-container">
        <h1 className="last-transaction-heading">Last Transaction</h1>
        <ul className="last-three-transaction-container">
          {transactionData.map(eachTransaction => (
            <LastTransactionItem
              eachTransaction={eachTransaction}
              key={eachTransaction.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLastTransactionDetails = () => {
    const {getTransactionApiStatus} = this.state
    switch (getTransactionApiStatus) {
      case APIConstants.success:
        return this.renderLastTransactionSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <SideNavbar />
        <div className="dashboard">
          <div className="dashboard-header">
            <h1 className="header-heading">Accounts</h1>
            <button type="button" className="add-transaction-button">
              <BiPlus size="20px" color="#ffffff" />
              Add Transaction
            </button>
          </div>
          <div className="dashboard-section">
            {this.renderCreditAndDebitCards()}
            {this.renderLastTransactionDetails()}
            <OverviewGraph />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
