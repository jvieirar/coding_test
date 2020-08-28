import React, { useEffect, useState } from 'react';

// @ts-ignore
import styles from './App.module.scss';
import ParcelList from './components/ParcelList';
import parcelApi from './api/parcel';
import ParcelAction from './components/ParcelAction';

function App() {
  // properties
  const [parcels, setParcels] = useState([]);

  // methods
  useEffect(() => {
    (async () => getAllParcels())();
  }, []);

  const getAllParcels = async () => {
    console.log('getAllParcels');
    const parcels = await parcelApi.getAllParcels();
    console.log({ parcels });
    setParcels(parcels);
  };

  // render
  return (
    <div className={styles.app}>
      <header>
        <h1>Parcel Manager</h1>
      </header>
      <main>
        <section>
          <ParcelList parcels={parcels} reload={getAllParcels} />
        </section>
        <section>
          <ParcelAction reload={getAllParcels} />
        </section>
      </main>
    </div>
  );
}

export default App;
