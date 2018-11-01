import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes/Routes";
import Layout from "./components/Layout/Layout";
import SharedMessage from "./components/SharedComponents/SharedMessage/SharedMessage"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <SharedMessage/>
          <Routes />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
