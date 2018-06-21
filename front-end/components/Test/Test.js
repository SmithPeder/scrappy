import React, { Component } from 'react';

import Row from '../Row/Row.js';

import styles from './Test.css';

class Test extends Component {
  render() {
    const data = this.props.data;

    const rows = [];
    data.forEach((elem, i) => {
      rows.push(<Row elem={elem} index={i} />);
    });

    return <div className={styles.root}>{rows}</div>;
  }
}

export default Test;
