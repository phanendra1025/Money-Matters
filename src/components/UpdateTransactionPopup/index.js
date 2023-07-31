import {Component} from 'react'
import Popup from 'reactjs-popup'
import {GrClose} from 'react-icons/gr'
import './index.css'

class UpdateTransactionPopup extends Component {
  render() {
    return (
      <Popup
        trigger={
          <button type="button" className="edit-button">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/v1690695535/MONEYMATTERS/pencil-02_kjipjl.png"
              alt="pencil"
              className="edit-image"
            />
          </button>
        }
        overlayStyle={{
          background: 'rgba(52, 64, 84, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
        modal
      >
        {close => (
          <div className="update-transactions-popup-container">
            <div className="update-transaction-popup-card">
              <div className="update-transaction-heading-container">
                <div>
                  <h1 className="update-transaction-heading">
                    Update Transaction
                  </h1>
                  <p className="update-transaction-para">
                    You can update your transaction here
                  </p>
                </div>

                <button
                  onClick={close}
                  type="button"
                  className="update-transaction-popup-close-button"
                >
                  <GrClose size="20px" color="#718EBF" />
                </button>
              </div>
              <form className="update-transaction-inputs-form">
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionName"
                    className="update-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    className="update-transactions-popup-inputs"
                    id="transactionName"
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="transactionType"
                    className="update-transactions-popup-labels"
                  >
                    Transaction Name
                  </label>
                  <input
                    className="update-transactions-popup-inputs"
                    id="transactionType"
                    type="text"
                    placeholder="Enter Transaction Type"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="category"
                    className="update-transactions-popup-labels"
                  >
                    Category
                  </label>
                  <input
                    className="update-transactions-popup-inputs"
                    id="category"
                    type="text"
                    placeholder="Select"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="amount"
                    className="update-transactions-popup-labels"
                  >
                    Amount
                  </label>
                  <input
                    className="update-transactions-popup-inputs"
                    id="amount"
                    type="text"
                    placeholder="Enter Your Amount"
                  />
                </div>
                <div className="update-transactions-inputs-wrapper">
                  <label
                    htmlFor="date"
                    className="update-transactions-popup-labels"
                  >
                    Date
                  </label>
                  <input
                    className="update-transactions-popup-inputs"
                    id="Date"
                    type="date"
                    placeholder="Date"
                  />
                </div>
                <button
                  type="submit"
                  className="update-transaction-popup-button"
                >
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

export default UpdateTransactionPopup
