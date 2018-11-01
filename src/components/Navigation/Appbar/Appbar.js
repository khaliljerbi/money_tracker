import React from "react";
import { Layout } from "antd";
import logo from "../../../assets/images/money.svg";
import { withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";
const { Header } = Layout;
class appbar extends React.Component {

renderActiePage() {
  switch (this.props.location.pathname) {
    case '/' : 
    return 'Dashboard'
    case '/transactions' : 
    return 'Transactions'
    case '/accounts' : 
    return 'Accounts'
    case '/budget' : 
    return 'Budget'
    case '/settings' : 
    return 'Settings'
    case '/reports' : 
    return 'Reports'
    default: 
    break;
  }
}
render(){
  return (
    <Header style={{ background: "#3f51b5", padding: 0 }}>
      {" "}
      <div style={{justifyContent: 'center'}}>
        <img
          style={{ marginLeft: "80px", marginRight: "50px" , marginTop:'-8px' }}
          alt="Money"
          src={logo}
        />
           <span style={{color:'white', fontSize:'25px'}}> {this.renderActiePage()} </span>
           <span style={{float:'right', color:'white' , marginRight:'2em'}}><Icon size='big' name='refresh'  /> </span>
        
        
      </div>
    </Header>
  );
}

 
};

export default withRouter(appbar);
