import React, { Component } from 'react';

import VerticalList from '../VerticalList/VerticalList.js';

import styles from './Row.css';

class Row extends Component {
  render() {
    const { data, display, firm } = this.props;
    const row = [];
    row.push(<img src={`../img/${firm}.jpg`} height={'60px'} width={'60px'} />);
    data &&
      Object.values(data).forEach((p, i) => {
        if (typeof p === 'object') {
          const innerDisplay = [
            ['50%', '100px', 'left'],
            ['50%', '100px', 'left']
          ];
          row.push(
            <span
              style={{
                width: display[i][0],
                minWidth: display[i][1],
                textAlign: display[i][2]
              }}
            >
              <Row
                data={p[0]}
                display={innerDisplay}
                anotherStyle={styles.innerRow}
              />
              {p[1] && (
                <Row
                  data={p[1]}
                  display={innerDisplay}
                  anotherStyle={styles.innerRow}
                />
              )}
            </span>
          );
        } else {
          const value = typeof p === 'boolean' ? (p ? 'SOLD' : 'LISTED') : p;
          row.push(
            <span
              style={{
                width: display[i][0],
                minWidth: display[i][1],
                textAlign: display[i][2]
              }}
            >
              {value}
            </span>
          );
        }
      });

    const cn =
      this.props.anotherStyle != null ? this.props.anotherStyle : styles.root;
    return <div className={cn}>{row}</div>;
  }
}

class TopRow extends Component {
  render() {
    const FIELDS = {
      property_id: 'Finn Code',
      property_adr: 'Address',
      property_sold: 'Status',
      property_listprice: 'Listprice',
      property_sellers: 'Sellers',
      property_records: 'Earlier sales'
    };
    const { arr, all, display } = this.props;
    const reducedRow = Object.keys(FIELDS)
      .filter(key => arr.includes(key))
      .reduce((obj, key) => {
        obj[key] = FIELDS[key];
        return obj;
      }, {});

    const row = [];
    Object.values(reducedRow).forEach((p, i) => {
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
    });
    return <div className={styles.topRow}>{row}</div>;
  }
}

export { Row, TopRow };
