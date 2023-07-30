import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Dashboard from './components/Dashboard'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Transaction from './components/Transactions'

function App() {
  return (
    <div className="app-container">
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/transactions" component={Transaction} />
      </Switch>
    </div>
  )
}

export default App
