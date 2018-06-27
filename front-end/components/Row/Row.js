import React, { Component } from "react";

import VerticalList from "../VerticalList/VerticalList.js";

import styles from "./Row.css";

class Row extends Component {
  render() {
    const { data, display } = this.props;

    const row = [];
    Object.values(data).forEach((p, i) => {
      if (typeof p === "object") {
        // TODO
      } else {
        row.push(
          <span
            style={{
              width: display[i][0],
              minWidth: display[i][1],
              textAlign: display[i][2]
            }}
          >
            {p}
          </span>
        );
      }
    });
    return <div className={styles.root}>{row}</div>;
  }
}

export default Row;
