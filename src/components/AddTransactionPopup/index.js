import {Component} from 'react'
import {BiPlus} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {GrClose} from 'react-icons/gr'
import './index.css'

const categoryList = [
  {
    categoryId: 1,
    categoryName: 'Transfer',
  },
  {
    categoryId: 2,
    categoryName: 'Shopping',
  },
  {
    categoryId: 3,
    categoryName: 'Subscription',
  },
  {
    categoryId: 4,
    categoryName: 'Food',
  },
  {
    categoryId: 5,
    categoryName: 'grocery',
  },
  {
    categoryId: 6,
    categoryName: 'Movie',
  },
]

class AddTransactionPopup extends Component {
  state = {
    transactionName: '',
    transactionType: '',
    category: '',
    amount: '',
    date: '',
  }

  onChangeTransactionName = event => {
    this.setState({transactionName: event.target.value})
  }

  onChangeTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  getTheDateDetails = date => {
    const inputDate = new Date(date)

    const now = new Date()

    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    inputDate.setHours(hours)
    inputDate.setMinutes(minutes)
    inputDate.setSeconds(seconds)

    return inputDate
  }

  submitAddTransaction = async event => {
    event.preventDefault()
    const userId = Cookies.get('user_id')
    const {
      transactionName,
      transactionType,
      category,
      amount,
      date,
    } = this.state
    if (!Number.isNaN(+amount)) {
      console.log('true')
      const dateValue = this.getTheDateDetails(date)
      const transactionDetails = {
        name: transactionName,
        type: transactionType,
        category,
        amount,
        date: dateValue,
        user_id: userId,
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': `${userId}`,
        },
        body: JSON.stringify(transactionDetails),
      }
      const response = await fetch(
        'https://bursting-gelding-24.hasura.app/api/rest/add-transaction',
        options,
      )
      window.location.reload(false)
      console.log(response.ok)
    } else {
      console.log('false')
    }
  }

  render() {
    const {
      transactionName,
      transactionType,
      category,
      amount,
      date,
    } = this.state
    return (
      <Popup
        trigger={
          <button type="button" className="add-transaction-button">
            <BiPlus size="20px" color="#ffffff" />
            Add Transaction
          </button>
        }
        overlayStyle={{
          background: 'rgba(52, 64, 84, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
        modal
      >
        {close => (
          <div className="aadd-transactions-popup-container">
            <div className="add-transaction-popup-card">
              <div className="heading-container">
                <div>
                  <h1 className="add-transaction-heading">Add Transaction</h1>
                  <p className="add-transaction-para">
                    Lorem ipsum dolor sit amet, consectetur{' '}
                  </p>
                </div>

                <button
                  onClick={close}
                  type="button"
                  className="add-transaction-popup-close-button"
                >
                  <GrClose size="20px" color="#718EBF" />
                </button>
              </div>
              <form
                className="inputs-form"
                onSubmit={this.submitAddTransaction}
              >
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionName"
                    className="add-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    value={transactionName}
                    className="add-transactions-popup-inputs"
                    id="transactionName"
                    type="text"
                    placeholder="Enter Name"
                    onChange={this.onChangeTransactionName}
                  />
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionType"
                    className="add-transactions-popup-labels"
                  >
                    Transaction Type
                  </label>
                  <select
                    value={transactionType}
                    className="add-transactions-popup-inputs"
                    id="transactionType"
                    type="text"
                    placeholder="Enter Transaction Type"
                    onChange={this.onChangeTransactionType}
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="category"
                    className="add-transactions-popup-labels"
                  >
                    Category
                  </label>
                  <select
                    className="add-transactions-popup-inputs"
                    id="category"
                    type="text"
                    placeholder="Select"
                    value={category}
                    onChange={this.onChangeCategory}
                  >
                    {categoryList.map(eachCategory => (
                      <option
                        key={eachCategory.categoryId}
                        value={eachCategory.categoryName}
                      >
                        {eachCategory.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="amount"
                    className="add-transactions-popup-labels"
                  >
                    Amount
                  </label>
                  <input
                    value={amount}
                    className="add-transactions-popup-inputs"
                    id="amount"
                    type="text"
                    placeholder="Enter Your Amount"
                    onChange={this.onChangeAmount}
                  />
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="date"
                    className="add-transactions-popup-labels"
                  >
                    Date
                  </label>
                  <input
                    className="add-transactions-popup-inputs"
                    id="Date"
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="add-transaction-popup-button">
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

export default AddTransactionPopup
