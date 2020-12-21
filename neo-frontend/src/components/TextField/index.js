import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function CustomTextField({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valueX, setValueX] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
        clearValue: () => {
          setValueX('');
        },
      });
    }
  }, [fieldName, registerField]); //eslint-disable-line

  return (
    <TextField
      inputRef={ref}
      error={!!error}
      helperText={error}
      defaultValue={valueX}
      {...rest}
    />
  );
}

CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
};
