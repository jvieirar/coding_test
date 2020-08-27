import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import styles from './ParcelList.module.scss';

const ParcelItem = (props) => {
  // properties
  const { parcel } = props;
  console.log({ parcel });

  // render
  return (
    <li key={parcel.id} className={styles.item}>
      <h2>{parcel.external_id}</h2>
      <span className={styles.parcelProp}>{parcel.retailer}</span>
      <span className={styles.parcelProp}>{parcel.customer}</span>
    </li>
  );
};

ParcelItem.propTypes = { parcel: PropTypes.object.isRequired };

export default ParcelItem;
