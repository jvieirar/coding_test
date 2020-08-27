import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './ParcelList.module.scss';
import ParcelItem from './ParcelItem';

const ParcelList = (props) => {
  // properties
  const { parcels = [] } = props;

  // methods

  // render
  return (
    <div className={styles.parcelList}>
      <h1>Parcel List</h1>
      <ul>
        {parcels.map((parcel) => (
          <ParcelItem parcel={parcel} />
        ))}
      </ul>
    </div>
  );
};

ParcelList.propTypes = {
  parcels: PropTypes.array.isRequired,
};

export default ParcelList;
