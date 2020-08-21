import React from 'react';
// @ts-ignore
import styles from './App.module.scss';
import ParcelList from './components/ParcelList/ParcelList';

function App() {
  // properties

  // methods

  // render
  return (
    <div className={styles.app}>
      <header>
        <h1>Parcel Manager</h1>
      </header>
      <main>
        <section>
          <ParcelList parcels={[]} />
        </section>
        <section></section>
      </main>
    </div>
  );
}

export default App;
