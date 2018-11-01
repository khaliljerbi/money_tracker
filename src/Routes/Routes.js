import React from 'react'
import {Route , Switch} from 'react-router-dom';
import Aux from "../HOC/Aux";
import Dashboard from '../components/Dashboard/Dashboard';
import Transactions from '../components/Transactions/Transactions';
import Accounts from '../components/Accounts/Accounts';
import Reports from '../components/Reports/Reports';
import Budget from '../components/Budget/Budget';
import Settings from '../components/Settings/Settings';
import TransactionsDetails from "../components/Transactions/TransactionsDetails/TransactionsDetails";
const routes = (props) => {
  return (
    <Aux>
        <Route path= "/" exact component={Dashboard}/>
        <Switch>
        <Route path= "/settings" exact component={Settings}/>
        <Route path= "/budget" exact  component={Budget}/>
        <Route path= "/reports" exact  component={Reports}/>
        <Route path= "/accounts" exact  component={Accounts}/>
        <Route path= "/transactions" exact   component={Transactions}/>
        <Route path= "/transactions/:id" exact  component={TransactionsDetails}/>
        </Switch>
        
    </Aux>
  )
}
export default routes;