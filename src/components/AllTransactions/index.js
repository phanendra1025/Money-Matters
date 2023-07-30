import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import TransactionItem from '../TransactionItem'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class AllTransactions extends Component {
  state = {
    allTransactionsData: [],
    transactionsApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheAllTransactions()
  }

  getTheAllTransactions = async () => {
    this.setState({transactionsApiStatus: APIConstants.inProcess})
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
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?offset=0&limit=50',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedAllTransactions = data.transactions.map(eachTransaction => ({
        amount: eachTransaction.amount,
        category: eachTransaction.category,
        date: eachTransaction.date,
        id: eachTransaction.id,
        transactionName: eachTransaction.transaction_name,
        type: eachTransaction.type,
        userId: eachTransaction.user_id,
      }))
      this.setState({
        allTransactionsData: updatedAllTransactions,
        transactionsApiStatus: APIConstants.success,
      })
      console.log(updatedAllTransactions)
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderALlTransactionSuccessView = () => {
    const {allTransactionsData} = this.state
    return (
      <div className="all-transactions-card">
        <div className="all-transaction-table-headings-container">
          <p className="transactions-table-headings">Transaction Name</p>
          <p className="transactions-table-headings category">Category</p>
          <p className="transactions-table-headings date">Date</p>
          <p className="transactions-table-headings amount">Amount</p>
        </div>
        <ul>
          {allTransactionsData.map(eachTransactionDetails => (
            <TransactionItem
              details={eachTransactionDetails}
              key={eachTransactionDetails.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderTransactionsViews = () => {
    const {transactionsApiStatus} = this.state
    switch (transactionsApiStatus) {
      case APIConstants.success:
        return this.renderALlTransactionSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTransactionsViews()}</div>
  }
}

export default AllTransactions
