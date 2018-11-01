import React, { Component } from "react";
import { Accordion, List, Button, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Aux from "../../../HOC/hoc";
import Modal from "../../UI/Modal/Modal";
import { firestore as db } from "../../../store";
import AccountEdit from "../../Accounts/AccountEdit/AccountEdit";
class AccordeonAccount extends Component {
  state = {
    activeIndex: 0,
    totalCashValue: 0,
    totalCreditValue: 0,
    totalBankValue: 0,
    account: {},
    cashID: '',
    creditID:'',
    BankID:'',
    open: false
    
  };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  componentDidMount() {
    let Cashcounter = 0;
    let Bankcounter = 0;
    let Creditcounter = 0;
    db.collection("accounts")
      .get()
      .then(data => {
        data.forEach(account => {
          if (account.data().group === "Cash") {
            Cashcounter =
              Cashcounter +parseFloat(account.data().usdBalance) + parseFloat(account.data().eurBalance) + parseFloat(account.data().jpyBalance);
          }
          if (account.data().group === "Credit") {
            Creditcounter =
              Creditcounter +parseFloat(account.data().usdBalance) +parseFloat(account.data().eurBalance) +parseFloat(account.data().jpyBalance);
          }
          if (account.data().group === "Bank Account") {
            Bankcounter =
              Bankcounter + parseFloat(account.data().usdBalance) + parseFloat(account.data().eurBalance) +parseFloat(account.data().jpyBalance);
          }
        });
        this.setState({
          totalCashValue: Cashcounter,
          totalBankValue: Bankcounter,
          totalCreditValue: Creditcounter
        });
        db.collection("accountgroup")
          .get()
          .then(data => {
            data.forEach(group => {
              if (group.data().groupName === "Cash") {
                this.setState({cashID:group.id})
              }
              if (group.data().groupName === "Credit") {
                this.setState({creditID:group.id})
              }
              if (group.data().groupName === "Bank Account") {
                this.setState({BankID:group.id})
              }
            })
           
            db.collection('accountgroup').doc(this.state.cashID).update({globalValue: this.state.totalCashValue})
            db.collection('accountgroup').doc(this.state.creditID).update({globalValue: this.state.totalCreditValue})
            db.collection('accountgroup').doc(this.state.BankID).update({globalValue: this.state.totalBankValue})
          }
            
          );
         
      });
  }
  onDeleteHandler = id => {
    const { firestore } = this.props;
    firestore
      .delete({ collection: "accounts", doc: id })
      .then(() => this.setState({ open: false }));
  };

  show = (size, account) => () =>
    this.setState({ size, account: account, open: true });


  close = () => this.setState({ open: false });


  render() {
    const { accountgp, accounts } = this.props;
    const { activeIndex } = this.state;

    let contentGroup = (
      <Loader active inline size="small">
        Loading
      </Loader>
    );
    if (accountgp && accounts) {
      contentGroup = accountgp.map(gp => (
        <Aux key={gp.index}>
          <Accordion.Title
            style={{ backgroundColor: "rgba(77,78,80,.05)" }}
            active={activeIndex === gp.index}
            index={gp.index}
            onClick={this.handleClick}
          >
            {gp.groupName}
            <span
              style={{
                float: "right",
                color: gp.globalValue >= 0 ? "green" : "red"
              }}
            >
              {" "}
            
            {parseFloat(gp.globalValue).toFixed(2)}  USD
            </span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === gp.index}>
            <List divided verticalAlign="middle">
              {accounts.map(
                account =>
                  account.group === gp.groupName ? (
                    <List.Item key={Math.random()}>
                      <List.Content floated="right">
                        <div className="ContainerFlex">
                          <span
                            style={{
                              color:
                                parseFloat(account.usdBalance) >= 0
                                  ? "green"
                                  : "red"
                            }}
                          >
                            {parseFloat(account.usdBalance).toFixed(2)} USD{" "}
                          </span>
                          <span
                            style={{
                              color:
                                parseFloat(account.eurBalance) >= 0
                                  ? "green"
                                  : "red"
                            }}
                          >
                            {parseFloat(account.eurBalance).toFixed(2)} EUR
                          </span>
                          <span
                            style={{
                              color:
                                parseFloat(account.jpyBalance) >= 0
                                  ? "green"
                                  : "red"
                            }}
                          >
                            {parseFloat(account.jpyBalance).toFixed(2)} JPY
                          </span>
                        </div>
                        {this.props.edit ? null : (
                          <Button
                            icon="pencil"
                            circular
                            onClick={this.show("large", account)}
                          />
                        )}
                      </List.Content>
                      <List.Content>
                        <Link to={`/transactions/${account.id}`}>
                          {account.name}
                        </Link>
                      </List.Content>
                    </List.Item>
                  ) : null
              )}
            </List>
          </Accordion.Content>
        </Aux>
      ));
    }
    return (
      <Aux>
        <Modal
          open={this.state.open}
          modify
          title="Edit Account"
          size="small"
          deleteItem={() => this.onDeleteHandler(this.state.account.id)}
          close={this.close}
        >
          <AccountEdit account={this.state.account} />
        </Modal>
        <Accordion fluid styled>
          {contentGroup}
        </Accordion>
      </Aux>
    );
  }
}

export default compose(
  firestoreConnect([
    { collection: "accountgroup" },
    { collection: "accounts" }
  ]),
  connect((state, props) => ({
    accountgp: state.firestore.ordered.accountgroup,
    accounts: state.firestore.ordered.accounts
  }))
)(AccordeonAccount);
