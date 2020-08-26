import React, { useEffect, useState } from 'react';
import axios from 'axios';

// @ts-ignore
import styles from './App.module.scss';
import ParcelList from './components/ParcelList/ParcelList';

function App() {
  // properties
  const [parcels, setParcels] = useState([]);

  // methods
  useEffect(() => {
    (async () => getAllParcels())();
  }, []);

  const getAllParcels = async () => {
    const { data } = await axios.get('http://localhost:4006/parcel/list');
    console.log({ data });
    setParcels(data);
  };

  // render
  return (
    <div className={styles.app}>
      <header>
        <h1>Parcel Manager</h1>
      </header>
      <main>
        <section>
          <ParcelList parcels={parcels} />
        </section>
        <section></section>
      </main>
    </div>
  );
}

export default App;
