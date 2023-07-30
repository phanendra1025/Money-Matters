import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class OverviewGraph extends Component {
  state = {
    creditedSum: 0,
    debitedSum: 0,
    apiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheLast7DaysTransactionsDetails()
  }

  getTheLast7DaysTransactionsDetails = async () => {
    this.setState({apiStatus: APIConstants.inProcess})
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
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        last7DaysTransactionsCreditDebitTotals:
          data.last_7_days_transactions_credit_debit_totals,
      }
      const {last7DaysTransactionsCreditDebitTotals} = updatedData
      console.log(last7DaysTransactionsCreditDebitTotals)
      const creditedDetails = last7DaysTransactionsCreditDebitTotals.filter(
        eachData => eachData.type === 'credit',
      )
      const debitedDetails = last7DaysTransactionsCreditDebitTotals.filter(
        eachData => eachData.type === 'debit',
      )
      const CreditedTotal = creditedDetails.reduce(
        (acc, cur) => acc + cur.sum,
        0,
      )
      const debitedTotal = debitedDetails.reduce((acc, cur) => acc + cur.sum, 0)
      this.setState({
        creditedSum: CreditedTotal,
        debitedSum: debitedTotal,
        apiStatus: APIConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderGraphSuccessView = () => {
    const {creditedSum, debitedSum} = this.state
    return (
      <div className="overview-graph-wrapper">
        <h1 className="overview-graph-heading">Debit & Credit Overview</h1>
        <div className="overview-graph-container">
          <p className="graph-text">
            {debitedSum} Debited & {creditedSum} Credited in this Week
          </p>
        </div>
      </div>
    )
  }

  renderBarGraph = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case APIConstants.success:
        return this.renderGraphSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderBarGraph()
  }
}

export default OverviewGraph
