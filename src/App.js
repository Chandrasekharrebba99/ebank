import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import InfoCard from './components/InfoCard'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={InfoCard} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
