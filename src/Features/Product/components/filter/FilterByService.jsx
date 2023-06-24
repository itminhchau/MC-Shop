
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';

FilterByService.propTypes = {
    onChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
};

function FilterByService({ onChange, filters = {} }) {

    const handleOnchange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target;
        onChange({
            [name]: checked
        })
    }

    return (
        <Box sx={{ padding: '8px' }}>
            <Typography>Dịch vụ</Typography>
            <ul>
                {[{ value: 'isPromotion', label: "có khuyến mãi" }, { value: 'isFreeShip', label: "miễn phí vận chuyển" }].map(service => {
                    return (
                        <li key={service.value}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={Boolean(filters[service.value])} onChange={handleOnchange} name={service.value} color="primary" />
                                }
                                label={service.label}
                            />
                        </li>

                    )
                })}
            </ul>

        </Box>
    );
}

export default FilterByService;