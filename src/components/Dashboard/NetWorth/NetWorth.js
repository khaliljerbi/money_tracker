import React, { Component } from "react";
import { connect } from "react-redux";
import "./NetWorth.css";
import AccordeonAccount from "../../SharedComponents/AccordeonAccount/AccordeonAccount";


class NetWorth extends Component {
  state = {
    showContent: true
  };
 
  render() {
    const content = <AccordeonAccount edit />
    return (content);
  }
}
const mapStateToProps = state => {
  return {
    account: state.account
  }
}
export default connect(mapStateToProps)(NetWorth);
