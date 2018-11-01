import React, { Component } from "react";
import { Segment , Header , Button } from "semantic-ui-react";
import AccordeonAccount from "../SharedComponents/AccordeonAccount/AccordeonAccount";
import Modal from "../UI/Modal/Modal";
import AccountForm from "./AccountForm/AccountForm";
class Accounts extends Component {
  state = {
    open: false
  }
  show = (size) => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });
  render() {
    return (
      <div>
        <Segment>
        <Header attached="top" block>
        <Button  content='New' icon='plus'  onClick={this.show('small')} />
        </Header>
          <AccordeonAccount  />
          
        </Segment>
        <Modal
         open={this.state.open}
         title="New Account"
         size="small"
         close={this.close}
        >
          <AccountForm />
        </Modal>
      </div>
    );
  }
}

export default Accounts;
