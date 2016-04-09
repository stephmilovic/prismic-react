import React, { PropTypes } from 'react';
import styles from './radio';

export const Radio = (props) =>
  <label>
    <input
      className={styles.inputRadio}
      {...props}
      type="radio"
    />
    {props.label}
  </label>;


Radio.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
