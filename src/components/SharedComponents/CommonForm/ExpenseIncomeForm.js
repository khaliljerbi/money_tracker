import React from "react";
import { Form, Input, Dropdown, Grid, Button , Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { formatDate } from '../../../Tricks/dateFormat';
import { add_data } from "../../../actions/Dashboard/RecentTransactions/actions";
import moment from 'moment';
import Aux from "../../../HOC/hoc";

const options2 = [
  { key: "usd", text: "USD", value: "USD" },
  { key: "eur", text: "EUR", value: "EUR" },
  { key: "jpy", text: "JPY", value: "JPY" }
];
const tagsIcome = [
  { key: "1", text: "Salary", value: "Salary" },
  { key: "2", text: "Bonus", value: "Bonus" },
  { key: "3", text: "EU Consulting", value: "EU Consulting" }
];
const tagsExpense = [
  { key: "1", text: "Groceries", value: "Groceries" },
  { key: "2", text: "Restaurant", value: "Restaurant" },
  { key: "3", text: "Rent", value: "Rent" },
  { key: "4", text: "Income Taxe", value: "Icome Taxe" },
  { key: "5", text: "Social Security", value: "Social Security" },
  { key: "6", text: "Utilities", value: "Utilities" }
]

class ExpenseIncomeForm extends React.Component {
  state = {
   transactionType: '',
   expenseName: '',
   incomeName: '',
   expenseValue:'',
   incomeValue:'',
   expenseCurrency: 'USD',
   incomeCurrency: 'USD',
   date: formatDate(new Date()),
   note: '',
   expenseTags:[],
   incomeTags: []
  };
  onSubmitData = e => {
    e.preventDefault();
    const {firestore, accounts} = this.props;
    let updatedAccount = {};
    let submitedData= {};
    let updatedBalance = {};

    if (this.props.fromTo === 'From'){
      submitedData = {
        transactionType: 'Expense',
        expenseName : this.state.expenseName,
        expenseValue: this.state.expenseValue,
        expenseCurrency : this.state.expenseCurrency,
        date : moment(this.state.date).toDate(),
        note : this.state.note,
        expenseTags: this.state.expenseTags
      }
      updatedAccount = accounts.filter(account => account.name === this.state.expenseName );
      switch(this.state.expenseCurrency){
        case 'USD':
      updatedBalance = {usdBalance: parseFloat(updatedAccount[0].usdBalance) + parseFloat(this.state.expenseValue)}
      break;
      case 'EUR':
      updatedBalance = {eurBalance: parseFloat(updatedAccount[0].eurBalance) + parseFloat(this.state.expenseValue)}
      break;
      case 'JPY':
      updatedBalance = {jpyBalance: parseFloat(updatedAccount[0].jpyBalance) + parseFloat(this.state.expenseValue)}
      break;
      default : return 0;
      }
      
      firestore.update({collection:'accounts', doc: updatedAccount[0].id} , updatedBalance);
    }
    if (this.props.fromTo === 'To'){
      submitedData = {
        transactionType: 'Income',
        incomeName : this.state.incomeName,
        incomeValue: this.state.incomeValue,
        incomeCurrency : this.state.incomeCurrency,
        date : moment(this.state.date).toDate(),
        note : this.state.note,
        incomeTags: this.state.incomeTags
      }
      updatedAccount = accounts.filter(account => account.name === this.state.incomeName );
      switch(this.state.expenseCurrency){
        case 'USD':
        updatedBalance = {usdBalance: parseFloat(updatedAccount[0].usdBalance) + parseFloat(this.state.incomeValue)}
      break;
      case 'EUR':
      updatedBalance = {eurBalance: parseFloat(updatedAccount[0].eurBalance) + parseFloat(this.state.incomeValue)}
      break;
      case 'JPY':
      updatedBalance = {jpyBalance: parseFloat(updatedAccount[0].jpyBalance) + parseFloat(this.state.incomeValue)}
      break;
      default : return 0;
      }
      
      firestore.update({collection:'accounts', doc: updatedAccount[0].id} , updatedBalance);
    }

    

    this.props.add_data(submitedData);

     this.setState({incomeTags:[] , expenseTags:[]});
    
   
  };
  render() {
    const {accounts} = this.props
    let form = null;
    if (accounts){
    if (this.props.fromTo === 'From') {
        form =  <Form onSubmit={this.onSubmitData}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Field>
                <label>{this.props.fromTo}</label>
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
                  label={<Dropdown  value={this.state.expenseCurrency} options={options2} onChange={(e,{value}) => this.setState({ expenseCurrency: value })}  />}
                  labelPosition="right"
                  type="number"
                  required
                  min = "0.01"
                  step = "0.01"
                  onChange={e => this.setState({ expenseValue: '-' + e.target.value })}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form.Field>
                <label> Tags</label>
                <Dropdown
                  placeholder="Choose existing tags"
                  fluid
                  multiple
                  selection
                  search
                  value = {this.state.expenseTags}
                  onChange={(e,{name,value}) => this.setState({ expenseTags: value })}
                  options={ tagsExpense}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field>
                <label>
                  {" "}
                  <br />{" "}
                </label>
                <input type="Date" value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} />
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
              <Button content='Add Expense' fluid primary />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    }
    else {
     form =  <Form onSubmit={this.onSubmitData}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form.Field>
              <label>{this.props.fromTo}</label>
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
                label={<Dropdown  value={this.state.incomeCurrency} options={options2} onChange={(e,{value}) => this.setState({ incomeCurrency: value })}  />}
                labelPosition="right"
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
            <Form.Field>
              <label> Tags</label>
              <Dropdown
                placeholder="Choose existing tags"
                fluid
                multiple
                selection
                search
                value = {this.state.incomeTags}
                onChange={(e,{name,value}) => this.setState({ incomeTags: value })}
                options={tagsIcome}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Field>
              <label>
                {" "}
                <br />{" "}
              </label>
              <input type="Date" value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} />
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
            <Button content='Add Income' fluid primary />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
    }
    
      
    return (<Aux>{form}</Aux>)
      
    }
    else  return (<div> <Loader active inline size='small'>Loading</Loader></div>)
  }
}



export default compose(
  firestoreConnect([{collection:'accounts'}]),
  connect( (state,props) => ({
    accounts:state.firestore.ordered.accounts
  }), {add_data})
)(ExpenseIncomeForm);
