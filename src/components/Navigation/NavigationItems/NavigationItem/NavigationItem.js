import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "antd";



class NavigationItem extends React.Component {
  render() {
    return (
      <Menu
        style= {{height: '100vh'}}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="1">
          <NavLink to="/">
            <span>
              <Icon type="dashboard" style={{ fontSize: "22px" }} />
              <span>Dashboard</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/transactions">
            <span>
              <Icon type="retweet" style={{ fontSize: "22px" }} />
              <span>Transactions</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/accounts">
            <span>
              <Icon type="credit-card" style={{ fontSize: "22px" }} />
              <span>Accounts</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/reports">
            <span>
              <Icon type="line-chart" style={{ fontSize: "22px" }} />
              <span>Reports</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/budget">
            <span>
              <Icon type="shopping-cart" style={{ fontSize: "22px" }} />
              <span>Budget</span>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/settings">
            <span>
              <Icon type="setting" style={{ fontSize: "22px" }} />
              <span>Settings</span>
            </span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavigationItem;
