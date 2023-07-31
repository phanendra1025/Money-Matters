import {Component} from 'react'
import format from 'date-fns/format'
import {BiUpArrowCircle, BiDownArrowCircle} from 'react-icons/bi'
import './index.css'
import DeletePopup from '../DeletePopup'
import UpdateTransactionPopup from '../UpdateTransactionPopup'

class LastTransactionItem extends Component {
  render() {
    const {eachTransaction} = this.props
    const {id, type, transactionName, category, date, amount} = eachTransaction
    const dateDetails = format(new Date(date), 'd MMM, h:m aa')
    const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
    const amountTextClass = type === 'credit' ? 'credit-amount' : 'debit-amount'
    return (
      <li className="transaction-item">
        <div className="transaction-detail-container">
          {type === 'credit' ? (
            <BiUpArrowCircle size="30px" color="#16DBAA" />
          ) : (
            <BiDownArrowCircle size="30px" color="#FE5C73" />
          )}
          <p className="transaction-name">{transactionName}</p>
          <p className="transaction-category">{category}</p>
          <p className="transaction-date-details">{dateDetails}</p>
          <p className={amountTextClass}>{amountText}</p>
          <UpdateTransactionPopup details={eachTransaction} />
          <DeletePopup itemId={id} />
        </div>
      </li>
    )
  }
}

export default LastTransactionItem
