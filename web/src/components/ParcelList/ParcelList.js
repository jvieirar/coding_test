import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './ParcelList.module.scss';
import ParcelItem from './ParcelItem';

const ParcelList = (props) => {
  // properties
  const { parcels = [] } = props;
  const [retailers, setRetailers] = useState([]);
  const [filters, setFilters] = useState({ parcelId: '', retailerName: '', customerEmail: '' });

  // methods
  const setFilterValue = (e) => {
    e.persist();
    setFilters((currentFilters) => ({ ...currentFilters, [e.target.name]: e.target.value }));
  };

  const applyFilters = (originalParcels) => {
    return originalParcels.filter(
      (parcel) =>
        parcel.external_id.toUpperCase().includes(filters.parcelId.toUpperCase()) &&
        parcel.retailer.toUpperCase().includes(filters.retailerName.toUpperCase()) &&
        parcel.customer.toUpperCase().includes(filters.customerEmail.toUpperCase())
    );
  };

  // render
  return (
    <div className={styles.parcelList}>
      <h1>Parcel List</h1>
      <div className={styles.filter}>
        <label>
          <span>Parcel id:</span>
          <input type="text" name="parcelId" value={filters.parcelId} onChange={setFilterValue} />
        </label>
        <label>
          <span>Retailer name:</span>
          <input type="text" name="retailerName" value={filters.retailerName} onChange={setFilterValue} />
        </label>
        <label>
          <span>Customer email:</span>
          <input type="text" name="customerEmail" value={filters.customerEmail} onChange={setFilterValue} />
        </label>
      </div>
      <ul>
        {applyFilters(parcels).map((parcel) => (
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
