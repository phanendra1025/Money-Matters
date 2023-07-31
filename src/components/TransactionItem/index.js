import format from 'date-fns/format'

import {BiUpArrowCircle, BiDownArrowCircle} from 'react-icons/bi'

import './index.css'
import UpdateTransactionPopup from '../UpdateTransactionPopup'
import DeletePopup from '../DeletePopup'

const TransactionItem = props => {
  const {details} = props
  const {type, transactionName, category, date, amount} = details
  const dateDetails = format(new Date(date), 'd MMM, h:m aa')
  const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
  const amountTextClass =
    type === 'credit'
      ? 'all-transaction-credit-amount'
      : 'all-transaction-debit-amount'
  return (
    <li className="all-transaction-item">
      <div className="all-transaction-detail-container">
        {type === 'credit' ? (
          <BiUpArrowCircle size="30px" color="#718EBF" />
        ) : (
          <BiDownArrowCircle size="30px" color="#718EBF" />
        )}
        <p className="all-transaction-name">{transactionName}</p>
        <p className="all-transaction-category">{category}</p>
        <p className="all-transaction-date-details">{dateDetails}</p>
        <p className={amountTextClass}>{amountText}</p>
        <UpdateTransactionPopup />
        <DeletePopup />
      </div>
    </li>
  )
}

export default TransactionItem
