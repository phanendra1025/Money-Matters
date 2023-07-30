import format from 'date-fns/format'

import {BiUpArrowCircle, BiDownArrowCircle} from 'react-icons/bi'

const TransactionItem = props => {
  const {details} = props
  const {type, transactionName, category, date, amount} = details
  const dateDetails = format(new Date(date), 'd MMM, h:m aa')
  const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
  const amountTextClass = type === 'credit' ? 'credit-amount' : 'debit-amount'
  return (
    <li className="transaction-item">
      <div className="transaction-detail-container">
        {type === 'credit' ? (
          <BiUpArrowCircle size="30px" color="##718EBF" />
        ) : (
          <BiDownArrowCircle size="30px" color="##718EBF" />
        )}
        <p className="transaction-name">{transactionName}</p>
        <p className="transaction-category">{category}</p>
        <p className="transaction-date-details">{dateDetails}</p>
        <p className={amountTextClass}>{amountText}</p>
        <button type="button" className="edit-button">
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695535/MONEYMATTERS/pencil-02_kjipjl.png"
            alt="pencil"
            className="edit-image"
          />
        </button>
        <button type="button" className="delete-button">
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
