import {Component} from 'react'
import {BiPlus} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import {GrClose} from 'react-icons/gr'
import './index.css'

class AddTransactionPopup extends Component {
  render() {
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
              <form className="inputs-form">
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionName"
                    className="add-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    className="add-transactions-popup-inputs"
                    id="transactionName"
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionType"
                    className="add-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    className="add-transactions-popup-inputs"
                    id="transactionType"
                    type="text"
                    placeholder="Enter Transaction Type"
                  />
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="category"
                    className="add-transactions-popup-labels"
                  >
                    Category
                  </label>
                  <input
                    className="add-transactions-popup-inputs"
                    id="category"
                    type="text"
                    placeholder="Select"
                  />
                </div>
                <div className="add-transactions-inputs-wrapper">
                  <label
                    htmlFor="amount"
                    className="add-transactions-popup-labels"
                  >
                    Amount
                  </label>
                  <input
                    className="add-transactions-popup-inputs"
                    id="amount"
                    type="text"
                    placeholder="Enter Your Amount"
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
