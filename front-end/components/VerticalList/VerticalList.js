import React, { Component } from 'react';

import styles from './VerticalList.css';

import { Row, TopRow } from '../Row/Row.js';

class VerticalList extends Component {
  render() {
    // The intention is for requstedFields and requstedDisplay to have the same
    // length and each index of requstedFields will correspond to each index
    // of requstedDisplay
    const { data, requstedFields, requstedDisplay } = this.props;
    const generatedRows = [];

    generatedRows.push(
      requstedFields != null ? (
        <TopRow arr={requstedFields} display={requstedDisplay} />
      ) : (
        <TopRow all={true} display={requstedDisplay} />
      )
    );

    const reducedData =
      requstedFields != null
        ? data.map(property => {
            const firm = property.property_sellers[0].firm;
            const reducedRow = Object.keys(property)
              .filter(key => requstedFields.includes(key))
              .reduce((obj, key) => {
                obj[key] = property[key];
                return obj;
              }, {});
            generatedRows.push(
              <Row data={reducedRow} display={requstedDisplay} firm={firm} />
            );
          })
        : generatedRows.push(
            <Row data={data} display={requstedDisplay} firm={firm} />
          );

    return <div className={styles.root}>{generatedRows}</div>;
  }
}

export default VerticalList;
