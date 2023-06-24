import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

InputFieldPassword.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disable: PropTypes.bool,
};


function InputFieldPassword(props) {
    const { form, name, label, disable } = props;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name}
                    control={form.control}
                    render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
                        <>
                            <OutlinedInput
                                id={name}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={label}
                                // error={invalid}
                                // helpertext={error?.message}
                                onChange={onChange}
                                // onBlur={onBlur}
                                name={name}
                                value={value}
                                disabled={disable}
                            />
                            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                        </>

                    )}
                ></Controller>

            </FormControl>


        </div>

    );
}

export default InputFieldPassword;