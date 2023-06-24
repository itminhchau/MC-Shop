import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormHelperText, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disable: PropTypes.bool,
};


function QuantityField(props) {
    const { form, name, label, disable } = props;
    const { setValue } = form;
    return (
        <div>
            <FormControl sx={{ mt: 1, mb: 1, width: '50%' }} variant="outlined">
                <Typography sx={{ textTransform: 'capitalize' }}>{label}</Typography>
                <Controller
                    name={name}
                    control={form.control}
                    render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type="number"
                                onChange={onChange}
                                // onBlur={onBlur}
                                name={name}
                                value={value}
                                disabled={disable}
                            />
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                                <AddCircleOutline />
                            </IconButton>
                            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                        </Box>

                    )}
                ></Controller>

            </FormControl>


        </div>

    );
}

export default QuantityField;