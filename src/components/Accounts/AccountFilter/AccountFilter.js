import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Form, Dropdown} from "semantic-ui-react";
import { get_Accounts } from "../../../actions/Accounts/actions";
import { set_FilterName , set_FilterTags } from "../../../actions/Dashboard/RecentTransactions/actions";
const tags = [
  { key: "1", text: "Groceries", value: "Groceries" },
  { key: "2", text: "Restaurant", value: "Restaurant" },
  { key: "3", text: "Rent", value: "Rent" },
  { key: "4", text: "Income Taxe", value: "Icome Taxe" },
  { key: "5", text: "Social Security", value: "Social Security" },
  { key: "6", text: "Utilities", value: "Utilities" },
  { key: "7", text: "Salary", value: "Salary" },
  { key: "8", text: "Bonus", value: "Bonus" },
  { key: "9", text: "EU Consulting", value: "EU Consulting" }
];
class AccountFilter extends Component {
  state = {
    accounts: [],
    tags: [],
    account: "",
    close: false
  };
  
  componentDidMount() {
    this.props.get_Accounts();
  }
   
  render() {
    const {accounts} = this.props.accounts;
    return (
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Accounts</label>
                <select
                  onChange={(e) => this.props.set_FilterName(e.target.value) }
                >
                  {accounts.map(account => (
                    <option key={account.id}> {account.data.name}</option>
                  ))}
                </select>
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Form.Field>
                <label> Tags</label>
                <Dropdown
                  placeholder="Choose existing tags"
                  fluid
                  multiple
                  selection
                  search
                  value = {this.state.tags}
                  onChange={(e,{value}) =>  {this.setState({tags:value});  this.props.set_FilterTags(value)}}
                  options={ tags}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    transactions: state.transactions
  }
}



export default connect(mapStateToProps, {get_Accounts , set_FilterName , set_FilterTags}) (AccountFilter);
