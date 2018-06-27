import React, { Component } from 'react';

import VerticalList from '../VerticalList/VerticalList.js';

import styles from './Test.css';

class Test extends Component {
  render() {
    const { data } = this.props;

    // Array of requstedFields this component want to render
    const minimal = [
      'property_adr', // Field 1
      'property_listprice', // Field 2
      'property_sold' // Field 3
    ];

    // "Styleguilde" for how one row of the list is rendered
    const minimalDisplay = [
      ['50%', '100px', 'left'], // width, min-width, text-align for Field 1
      ['25%', '250px', 'center'], // width, min-width, text-align for Field 2
      ['25%', '150px', 'right'] // width, min-width, text-align for Field 3
    ];

    const sellers = ['property_adr', 'property_sellers'];
    const sellersDisplay = [['30%', '200px', 'left'], ['70%', '400px', 'left']];

    const records = [
      'property_adr',
      'property_listprice',
      'property_sellers',
      'property_records'
    ];
    const recordsDisplay = [
      ['35%', '200px', 'left'],
      ['10%', '100px', 'right'],
      ['35%', '200px', 'left'],
      ['40%', '400px', 'left']
    ];

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
        <VerticalList
          data={data}
          requstedFields={records}
          requstedDisplay={recordsDisplay}
        />
      </div>
    );
  }
}

export default Test;
