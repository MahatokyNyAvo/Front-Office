import * as React from 'react'
import { Link, Redirect } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Liste from './components/Liste'
import Historique from './components/Historique'
import Detail from './components/Detail'
import Login from './components/Login'
import Miser from './components/miser'
const Home = () => {
  return (
    <Router>
      <>
        <div style={{paddingTop: '5px'}}>
          <nav >
              <ul id="sidebarnav">
                <li>
                  <Link to="/">
                      Liste
                  </Link>
                </li>
                <li>
                <Link to={{
                  pathname: '/login',
                  state: { page: "historique"}
                }}> Historique </Link>
                </li>
              </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/" component={Liste} />
          <Route path="/historique/:id" component={Historique} />
          <Route path="/historique" component={Historique} />
          <Route path="/login" component={Login} />
          <Route path="/enchere/:id" component={Detail} />
          <Route path="/miser" component={Miser} />
          <Route path="*" render={() => <Redirect to="/" replace />} />
        </Switch> 
      </>
    </Router>
  );
}

export default Home;



