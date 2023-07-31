import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import collect from 'collect.js'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import './index.css'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class OverviewGraph extends Component {
  state = {
    barData: [],
    apiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheLast7DaysTransactionsDetails()
  }

  getTheLast7DaysTransactionsDetails = async () => {
    this.setState({apiStatus: APIConstants.inProcess})
    const userId = Cookies.get('user_id')
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.last_7_days_transactions_credit_debit_totals.map(
        each => ({
          day: format(new Date(each.date), 'E'),
          sum: each.sum,
          type: each.type,
        }),
      )
      this.setState({barData: updatedData, apiStatus: APIConstants.success})
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderGraph = barData => (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={barData}
        margin={{
          top: 2,
        }}
      >
        <CartesianGrid strokeDasharray="3" />
        <XAxis
          dataKey="day"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          iconType="square"
          wrapperStyle={{
            padding: 10,
          }}
          verticalAlign="top"
          align="right"
        />
        <Bar dataKey="sum" name="Debit" fill="#4C78FF" barSize="10" rx="10" />
        <Bar dataKey="sum" name="Credit" fill="#FCAA0B" barSize="20" rx="10" />
      </BarChart>
    </ResponsiveContainer>
  )

  renderGraphSuccessView = () => {
    const {barData} = this.state
    const creditedList = barData.map(each => {
      if (each.type === 'credit') {
        return each.sum
      }
      return 0
    })
    const debitedList = barData.map(each => {
      if (each.type === 'debit') {
        return each.sum
      }
      return 0
    })
    const credit = collect(creditedList).sum()
    const debit = collect(debitedList).sum()
    return (
      <div className="overview-graph-wrapper">
        <h1 className="overview-graph-heading">Debit & Credit Overview</h1>
        <div className="overview-graph-container">
          <p className="graph-text">
            <span className="overview-graph-span-texts">{credit}</span> Debited
            & <span className="overview-graph-span-texts">{debit}</span>{' '}
            Credited in this Week
          </p>
          {this.renderGraph(barData)}
        </div>
      </div>
    )
  }

  renderBarGraph = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case APIConstants.success:
        return this.renderGraphSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderBarGraph()
  }
}

export default OverviewGraph
