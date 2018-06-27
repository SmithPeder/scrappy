import React, { Component } from "react";

import styles from "./VerticalList.css";

import Row from "../Row/Row.js";

class VerticalList extends Component {
  render() {
    // The intention is for requstedFields and requstedDisplay to have the same
    // length and each index of requstedFields will correspond to each index
    // of requstedDisplay
    const { data, requstedFields, requstedDisplay } = this.props;
    const generatedRows = [];
    const reducedData =
      requstedFields != null
        ? data.map(property => {
            const reducedRow = Object.keys(property)
              .filter(key => requstedFields.includes(key))
              .reduce((obj, key) => {
                obj[key] = property[key];
                return obj;
              }, {});
            generatedRows.push(
              <Row data={reducedRow} display={requstedDisplay} />
            );
          })
        : generatedRows.push(<Row data={data} display={requstedDisplay} />);

    return <div className={styles.root}>{generatedRows}</div>;
  }
}

export default VerticalList;
