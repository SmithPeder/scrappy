import React, { Component } from "react";

import VerticalList from "../VerticalList/VerticalList.js";

import styles from "./Test.css";

class Test extends Component {
  render() {
    const { data } = this.props;

    // Array of requstedFields this component want to render
    const minimal = [
      "property_id", // Field 1
      "property_adr", // Field 2
      "property_listprice" // Field 3
    ];

    // "Styleguilde" for how one row of the list is rendered
    const minimalDisplay = [
      ["25%", "100px", "left"], // width, min-width, text-align for Field 1
      ["50%", "250px", "left"], // width, min-width, text-align for Field 2
      ["25%", "150px", "right"] // width, min-width, text-align for Field 3
    ];

    const sellers = ["property_adr", "property_sellers"];
    const sellersDisplay = [["45%", "200px", "left"], ["55%", "500px", "left"]];

    return (
      <div>
        <VerticalList
          data={data}
          requstedFields={minimal}
          requstedDisplay={minimalDisplay}
        />
        <VerticalList
          data={data}
          requstedFields={sellers}
          requstedDisplay={sellersDisplay}
        />
      </div>
    );
  }
}

export default Test;
