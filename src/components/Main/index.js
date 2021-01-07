import React, { useContext } from 'react';
import Header from '../Header'
import Company from '../Company'
import Table from '../Table'

import './index.css'

export default function Main() {
  

  return (
    <div className='wrapper_app'>
      <Header />
      <div className='container_app'>
        <div className='container_table'>
          <Company />
        </div>
        <div className='container_table'>
          <Table />
        </div>
      </div>
    </div>
  );
}
