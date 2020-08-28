import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import styles from './ParcelAction.module.scss';
import customerService from '../../api/customer';
import retailerService from '../../api/retailer';
import parcelService from '../../api/parcel';

function ParcelAction(props) {
  // properties
  const { reload } = props;
  const [fields, setFields] = useState({ retailer: '', customer: '', retailerName: '' });
  const [retailers, setRetailers] = useState([]);
  const [customers, setCustomers] = useState([]);

  // methods
  useEffect(() => {
    (async () => await loadRetailersAndCustomers())();
  }, []);

  const loadRetailersAndCustomers = async () => {
    const retailers = await retailerService.getAllRetailers();
    if (retailers) {
      setRetailers(retailers);
    }
    const customers = await customerService.getAllCustomers();
    if (customers) {
      setCustomers(customers);
    }
  };

  const handleAddParcel = async () => {
    await parcelService.createOneParcel({ retailer: parseInt(fields.retailer), customer: parseInt(fields.customer) });
    reload();
  };

  const handleCreateRetailer = async () => {
    await retailerService.createOneRetailer({ name: fields.retailerName });
    setFields((curr) => ({ ...curr, retailerName: '' }));
    loadRetailersAndCustomers();
  };

  const setFieldValue = (e) => {
    e.persist();
    setFields((currentFields) => ({ ...currentFields, [e.target.name]: e.target.value }));
  };

  // render
  return (
    <div className={styles.parcelActionContainer}>
      <div className={styles.parcelAction}>
        <h1>Add parcel</h1>
        <div className={styles.fields}>
          <label>
            <span>Retailer:</span>
            {/* <input type="text" name="retailer" value={fields.retailer} onChange={setFieldValue} /> */}
            <select name="retailer" onChange={setFieldValue} value={fields.retailer}>
              <option value="">-</option>
              {retailers.map((retailer) => (
                <option value={retailer.id} key={retailer.id}>
                  {retailer.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Customer:</span>
            {/* <input type="text" name="retailer" value={fields.retailer} onChange={setFieldValue} /> */}
            <select name="customer" onChange={setFieldValue} value={fields.customer}>
              <option value="">-</option>
              {customers.map((customer) => (
                <option value={customer.id} key={customer.id}>
                  {customer.name} - {customer.email}
                </option>
              ))}
            </select>
          </label>
          <button className={`btn btn__full`} onClick={handleAddParcel}>
            Add
          </button>
        </div>
      </div>
      <div className={styles.parcelAction}>
        <h1>Create retailer</h1>
        <div className={styles.fields}>
          <label>
            <span>Name:</span>
            {/* <input type="text" name="retailer" value={fields.retailer} onChange={setFieldValue} /> */}
            <input name="retailerName" type="text" onChange={setFieldValue} value={fields.retailerName} />
          </label>
          <button className={`btn btn__full`} onClick={handleCreateRetailer}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

ParcelAction.propTypes = {
  reload: PropTypes.func.isRequired,
};

export default ParcelAction;
