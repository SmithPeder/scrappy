import React, { Component } from 'react';

import styles from './Row.css';

class Row extends Component {
  render() {
    const data = this.props.elem;
    const status = data.property_sold ? styles.red : styles.normal;
    return (
      <div className={status}>
        <p className={styles.index}>{this.props.index}</p>
        <p className={styles.id}>{data.property_id}</p>
        <p className={styles.adr}>{data.property_adr}</p>
        <p className={styles.name}>{data.property_sellers[0].name}</p>
        <p className={styles.firm}>{data.property_sellers[0].firm}</p>
        <p className={styles.listprice}>{data.property_listprice}</p>
      </div>
    );
  }
}

export default Row;
