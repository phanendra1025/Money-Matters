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

class DebitTransactions extends Component {
  state = {
    debitTransactionsData: [],
    transactionsApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheDebitTransactions()
  }

  getTheDebitTransactions = async () => {
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
      const debitTransactions = updatedAllTransactions.filter(
        eachTransaction => eachTransaction.type === 'debit',
      )
      this.setState({
        debitTransactionsData: debitTransactions,
        transactionsApiStatus: APIConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderDebitTransactionsSuccessView = () => {
    const {debitTransactionsData} = this.state
    return (
      <div className="all-transactions-card">
        <div className="all-transaction-table-headings-container">
          <p className="transactions-table-headings">Transaction Name</p>
          <p className="transactions-table-headings category">Category</p>
          <p className="transactions-table-headings date">Date</p>
          <p className="transactions-table-headings amount">Amount</p>
        </div>
        <ul className="all-transaction-list-container">
          {debitTransactionsData.map(eachTransactionDetails => (
            <TransactionItem
              details={eachTransactionDetails}
              key={eachTransactionDetails.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderDebitTransactionsViews = () => {
    const {transactionsApiStatus} = this.state
    switch (transactionsApiStatus) {
      case APIConstants.success:
        return this.renderDebitTransactionsSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderDebitTransactionsViews()}</div>
  }
}

export default DebitTransactions
