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
  const [filters, setFilters] = useState({ parcelId: '', retailerName: '', customerEmail: '' });
  const [selected, setSelected] = useState([]);

  // methods
  useEffect(() => {
    setRetailers(['', ...new Set(parcels.map((parcel) => parcel.retailer))]);
  }, [parcels]);

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

  const isSelected = (parcel) => selected.map((sel) => sel.external_id).includes(parcel.external_id);

  const handleOnParcelClick = (parcel) => {
    if (!isSelected(parcel)) {
      setSelected((currentSelected) => [...currentSelected, parcel]);
    } else {
      setSelected((currentSelected) => currentSelected.filter((sel) => sel.external_id !== parcel.external_id));
    }
  };

  const handleOnDelete = async () => {
    await parcelService.deleteParcels(selected);
    setSelected([]);
    reload();
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
          {/* <input type="text" name="retailerName" value={filters.retailerName} onChange={setFilterValue} /> */}
          <select name="retailerName" onChange={setFilterValue} value={filters.retailerName}>
            {retailers.map((retailer) => (
              <option value={retailer} key={retailer}>
                {retailer === '' ? 'All' : retailer}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Customer email:</span>
          <input type="text" name="customerEmail" value={filters.customerEmail} onChange={setFilterValue} />
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
          <ParcelItem parcel={parcel} selected={isSelected(parcel)} onClick={handleOnParcelClick} key={parcel.id} />
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
