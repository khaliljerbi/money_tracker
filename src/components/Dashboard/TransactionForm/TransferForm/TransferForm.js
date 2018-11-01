import React, { Component } from "react";

import { Form, Input, Dropdown, Grid, Button, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { formatDate } from "../../../../Tricks/dateFormat";
import { compose } from "redux";
import moment from 'moment';
import { firestoreConnect } from "react-redux-firebase";
const options2 = [
  { key: "usd", text: "USD", value: "USD" },
  { key: "eur", text: "EUR", value: "EUR" },
  { key: "jpy", text: "JPY", value: "JPY" }
];

class TransferForm extends Component {
  state = {
    transactionType: 'Transfer',
    expenseName: '',
    incomeName: '',
    expenseValue:'',
    incomeValue:'',
    expenseCurrency: 'USD',
    incomeCurrency: 'USD',
    date: formatDate(new Date()),
    note: ''
  };
  onSubmitData = e => {
    e.preventDefault();
    const submittedData = {
      transactionType: this.state.transactionType,
      expenseName: this.state.expenseName,
      incomeName: this.state.incomeName,
      expenseValue: this.state.expenseValue,
      incomeValue:this.state.incomeValue,
      expenseCurrency: this.state.expenseCurrency,
      incomeCurrency: this.state.incomeCurrency,
      date: moment(this.state.date).toDate(),
      note: ''
    };
    
    const {firestore , accounts} = this.props;
    firestore.add({collection: 'transactions'} , submittedData);
    const expenseAccount = accounts.filter(account => account.name === this.state.expenseName)
    const incomeAccount = accounts.filter(account => account.name === this.state.incomeName)
    const updatedBalanceExpense  = { usdBalance : parseFloat(expenseAccount[0].usdBalance) - parseFloat(this.state.expenseValue)  }
    firestore.update({collection: 'accounts' , doc : expenseAccount[0].id}, updatedBalanceExpense );
    const updatedBalanceIncome  = { usdBalance : parseFloat(incomeAccount[0].usdBalance) + parseFloat(this.state.expenseValue)  }
    firestore.update({collection: 'accounts' , doc : incomeAccount[0].id}, updatedBalanceIncome );
    this.setState({expenseValue: '' , incomeValue: '' });
    
    
  };
  render() {
    const {accounts} = this.props;
    if (accounts){
      return (<Form onSubmit={this.onSubmitData}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Field>
              <label>From</label>
                <select
                  value={this.state.expenseName}
                  name="action"
                  placeholder=""
                  onChange={(e) => this.setState({ expenseName: e.target.value})}
                >
                {accounts.map(option => <option key={option.id} value={option.name}>
                {option.name}
                
                 </option>)}
                </select>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field>
                <label>
                  {" "}
                  <br />{" "}
                </label>
                <Input
                  label={
                    <Dropdown
                      defaultValue="USD"
                      options={options2}
                      onChange={(e, { value }) =>
                        this.setState({ expenseCurrency: value })
                      }
                    />
                  }
                  labelPosition="right"
                  type="number"
                  required
                  min = "0.01"
                  step = "0.01"
                  value={this.state.expenseValue}
                  onChange={e => this.setState({expenseValue: e.target.value })}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Field>
                {" "}
                {/*   this will be props later */}
                <label>To</label>
                <select
                  value={this.state.incomeName}
                  name="action"
                  placeholder=""
                  onChange={(e) => this.setState({ incomeName: e.target.value})}
                >
                {accounts.map(option => <option key={option.id} value={option.name}>
                {option.name}
                
                 </option>)}
                </select>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field>
                <label>
                  {" "}
                  <br />{" "}
                </label>
                <Input
                  label={
                    <Dropdown
                      defaultValue="USD"
                      options={options2}
                      onChange={(e, { value }) =>
                        this.setState({ incomeCurrency: value })
                      }
                    />
                  }
                  labelPosition="right"
                  value={this.state.incomeValue}
                  type="number"
                  required
                  min = "0.01"
                  step = "0.01"
                  onChange={e => this.setState({ incomeValue: e.target.value })}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Input
                placeholder="Note"
                type="text"
                onChange={e => this.setState({ note: e.target.value })}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field>
                <input
                  type="Date"
                  value={this.state.date}
                  onChange={e => this.setState({ date: e.target.value })}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10} />
            <Grid.Column width={6}>
              <Button content='Add Transfer' type="submit" fluid primary />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>)

    }
    else {
     return <Loader size="medium" active inline>Loading </Loader>
    }
    
  }
}
// const mapStateToProps = state => {
//   return {
//     dashboard: state.dashboard
//   }
// }
export default compose(
  firestoreConnect([{collection:'accounts'}]),
  connect( (state,props) => ({
    accounts:state.firestore.ordered.accounts
  }))
)(TransferForm);
