import React from 'react';
import PropTypes from 'prop-types';

const ParcelItem = (props) => {
  // properties
  const { parcel } = props;
  return <li key={parcel.id}>{parcel.id}</li>;
};

ParcelItem.propTypes = { parcel: PropTypes.object.isRequired };

export default ParcelItem;
