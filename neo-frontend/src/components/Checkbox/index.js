import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function CustomCheckBox({ label, name, valor, valueChanged }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [valueX, setValueX] = useState(defaultValue || valor);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
        clearValue: () => {
          setValueX(false);
          valueChanged(false);
        },
      });
    }
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => {
            setValueX(!valueX);
            valueChanged(!valueX);
          }}
          value={valueX}
          color="primary"
          checked={valueX}
        />
      }
      name={name}
      label={label}
      inputRef={ref}
    />
  );
}

CustomCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valor: PropTypes.bool,
  valueChanged: PropTypes.func,
};

CustomCheckBox.defaultProps = {
  valor: false,
  valueChanged: () => {
    return false;
  },
};
