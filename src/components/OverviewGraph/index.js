import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class OverviewGraph extends Component {
  componentDidMount() {
    this.getTheLast7DaysTransactionsDetails()
  }

  getTheLast7DaysTransactionsDetails = async () => {
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
    console.log(data)
  }

  render() {
    return (
      <div className="overview-graph-wrapper">
        <h1 className="overview-graph-heading">Debit & Credit Overview</h1>
        <div className="overview-graph-container">
          <p className="graph-text">
            $7,560 Debited & $5,420 Credited in this Week
          </p>
        </div>
      </div>
    )
  }
}

export default OverviewGraph
