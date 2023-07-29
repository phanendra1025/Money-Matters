import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Dashboard from './components/Dashboard'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginRoute} />
      </Switch>
    </div>
  )
}

export default App
