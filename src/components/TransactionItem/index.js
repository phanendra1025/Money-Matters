import format from 'date-fns/format'

import {BiUpArrowCircle, BiDownArrowCircle} from 'react-icons/bi'

import './index.css'

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
          <BiUpArrowCircle size="30px" color="##718EBF" />
        ) : (
          <BiDownArrowCircle size="30px" color="##718EBF" />
        )}
        <p className="all-transaction-name">{transactionName}</p>
        <p className="all-transaction-category">{category}</p>
        <p className="all-transaction-date-details">{dateDetails}</p>
        <p className={amountTextClass}>{amountText}</p>
        <button type="button" className="all-transaction-edit-button">
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695535/MONEYMATTERS/pencil-02_kjipjl.png"
            alt="pencil"
            className="all-transaction-edit-image"
          />
        </button>
        <button type="button" className="all-transaction-delete-button">
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695667/MONEYMATTERS/trash-01_mfx7en.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
