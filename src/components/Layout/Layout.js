import React, { Component } from "react";
import { Layout } from "antd";
import AppBar from "../Navigation/Appbar/Appbar";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import MainContent from "../Navigation/MainContent/Maincontent";
import Footer from "../Navigation/Footer/Footer";
class CustomLayout extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <AppBar />
        <Layout>
          <NavigationItems />
          <Layout>
           <MainContent content={this.props.children} />
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default CustomLayout;
