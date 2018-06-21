import React, { Component } from 'react';

import styles from './Header.css';

class Header extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className={styles.root}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    );
  }
}

export default Header;
