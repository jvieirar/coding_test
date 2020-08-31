import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './ParcelList.module.scss';
import ParcelItem from './ParcelItem';
import parcelService from '../../api/parcel';

const ParcelList = (props) => {
  // properties
  const { parcels = [], reload } = props;
  const [retailers, setRetailers] = useState(['']);
  const [filters, setFilters] = useState({ parcelId: '', retailerName: '' });
  const [selected, setSelected] = useState([]);

  // methods
  useEffect(() => {
    // TODO: * Bonus: show dropdown with a list of all retailers existing in the parcel list to filter by retailer
    const uniqueRetailers = [
      /* make sure you don't add duplicates */
    ];
    setRetailers(['', ...uniqueRetailers]);
    // [parcels] means that this function will be called every time the parcels property changes
  }, [parcels]);

  const setFilterValue = (e) => {
    e.persist();
    setFilters((currentFilters) => ({ ...currentFilters, [e.target.name]: e.target.value }));
  };

  const applyFilters = (originalParcels) => {
    // TODO: filter parcels here
    return originalParcels;
  };

  // const isSelected = (parcel) => selected.map((sel) => sel.external_id).includes(parcel.external_id);

  const handleOnParcelClick = (parcel) => {
    // TODO: add or remove parcel to/from selected list
  };

  const handleOnDelete = async () => {
    // TODO: call api to delete selected parcels. Remember to clean selected list after deletion
    // * TIP: you have a function from the parent component to reload parcel list from db
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
          <input type="text" name="retailerName" />
        </label>
      </div>
      {selected.length > 0 && (
        <div className={styles.buttonsSection}>
          <button className={`btn`} onClick={handleOnDelete}>
            Delete ({selected.length})
          </button>
        </div>
      )}
      <ul>
        {applyFilters(parcels).map((parcel) => (
          <ParcelItem parcel={parcel} /*selected={isSelected(parcel)}*/ onClick={handleOnParcelClick} key={parcel.id} />
        ))}
      </ul>
    </div>
  );
};

ParcelList.propTypes = {
  parcels: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired,
};

export default ParcelList;
