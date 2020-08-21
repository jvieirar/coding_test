import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './ParcelList.module.scss';

const ParcelList = (props) => {
  // properties
  const { parcels = [] } = props;

  // methods

  // render
  return (
    <div className={styles.parcelList}>
      <h1>Parcel List</h1>
      // TODO: build list items
    </div>
  );
};

ParcelList.propTypes = {
  parcels: PropTypes.array.isRequired,
};

export default ParcelList;
