import React from "react";
import { Layout } from "antd";
import NavigationItem from "./NavigationItem/NavigationItem";
class ResponsiveDrawer extends React.Component {
  render() {
    const {Sider} = Layout;
    return (
      <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            
          }}
          onCollapse={(collapsed, type) => {
            
          }}
        >
          <div className="logo" />
          <NavigationItem/>
        </Sider>
    );
  }
}

export default ResponsiveDrawer;
