import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import styles from './ParcelList.module.scss';

const ParcelItem = (props) => {
  // properties
  const { parcel, selected, onClick } = props;

  // methods
  const handleOnClick = () => {
    onClick && onClick(parcel);
  };

  // render
  return (
    <li className={`${styles.item}${selected ? ` ${styles.selected}` : ''}`} onClick={handleOnClick}>
      <h2>{parcel.external_id}</h2>
      <span className={styles.parcelProp}>{parcel.retailer}</span>
      <span className={styles.parcelProp}>{parcel.customer}</span>
    </li>
  );
};

ParcelItem.propTypes = { parcel: PropTypes.object.isRequired, selected: PropTypes.bool.isRequired, onClick: PropTypes.func };

export default ParcelItem;
