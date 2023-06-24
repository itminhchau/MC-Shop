import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disable: PropTypes.bool,
};
const useStyles = makeStyles(() => ({
    textField: {
        marginBottom: "10px!important"
    }
}))

function InputField(props) {
    const { form, name, label, disable } = props;
    const classes = useStyles()
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
                <TextField
                    // margin="normal"
                    // variant="outlined"
                    fullWidth
                    label={label}
                    error={invalid}
                    helperText={error?.message}
                    onChange={onChange}
                    // onBlur={onBlur}
                    name={name}
                    value={value}
                    disabled={disable}
                    className={classes.textField}
                />
            )}
        ></Controller>
    );
}

export default InputField;