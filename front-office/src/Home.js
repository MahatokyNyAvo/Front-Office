import * as React from 'react'
import { Link, Redirect } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Liste from './components/Liste'
import Historique from './components/Historique'
import Detail from './components/Detail'
import Login from './components/Login'
import Miser from './components/miser'
import Loading from './components/loading'
const Home = () => {
  return (
    <Router>
      <div id="wrapper">
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="material-icons">attach_money</i></div>
                    <div className="sidebar-brand-text mx-3"><span>Binding</span></div>
                </a>
                <hr className="sidebar-divider my-0"/>
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item"><Link to="/" className="nav-link active" ><i className="far fa-list-alt"></i><span>Liste encheres</span></Link></li>
                    <li className="nav-item">
                      <Link to={{
                  pathname: '/login',
                  state: { page: "historique"}
                }} className="nav-link"><i className="fas fa-history"></i><span>Historique</span></Link></li>
                </ul>
            </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Liste} />
          <Route path="/historique/:id" component={Historique} />
          <Route path="/historique" component={Historique} />
          <Route path="/login" component={Login} />
          <Route path="/enchere/:id" component={Detail} />
          <Route path="/miser" component={Miser} />
          <Route path="/gif" component={Loading} />
          <Route path="*" render={() => <Redirect to="/" replace />} />
        </Switch> 
      </div>
    </Router>
  );
}

export default Home;



