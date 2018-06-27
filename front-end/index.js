import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header/Header.js";
import Test from "./components/Test/Test.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Scrappy" />
        <Test data={this.props.data} />
      </div>
    );
  }
}

fetch("http://localhost:8000/properties?property_sold=true")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    ReactDOM.render(<App data={json} />, document.getElementById("root"));
  });
