import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo } from 'react';

FilterViewer.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        listStyle: 'none',
        flexWrap: 'wrap',
        margin: '16px 8px',
        gap: '8px',

        '& li': {

        }
    }
})

const FIRST_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'Vận chuyển khuyến mãi',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilters = { ...filters }
            if (filters.isFreeShip) {
                delete newFilters.isFreeShip
            } else {
                newFilters.isFreeShip = true
            }
            console.log("isfreeship", filters.isActive);
            return newFilters
        }
    },
    {
        id: 2,
        getLabel: (filters) => `${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes("salePrice_gte") && Object.keys(filters).includes("salePrice_lte"),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.salePrice_gte
            delete newFilters.salePrice_lte
            return newFilters
        },
        onToggle: () => { }
    },
    {
        id: 3,
        getLabel: (filters) => 'có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes("isPromotion"),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters }
            delete newFilters.isPromotion
            return newFilters
        },
        onToggle: () => { }
    },
]
function FilterViewer({ onChange = null, filters = {} }) {
    const classes = useStyles()
    const visibleFilter = useMemo(() => {
        return FIRST_LIST.filter(x => x.isVisible(filters))
    }, [filters])
    return (
        <Box component="ul" className={classes.root}>
            {visibleFilter.map(item => {
                return (
                    <li key={item.id}>
                        <Chip sx={{ cursor: 'pointer' }}
                            label={item.getLabel(filters)}
                            color={item.isActive(filters) ? 'primary' : 'default'}
                            onDelete={item.isRemovable ? () => {
                                if (!onChange) return;
                                const newFilters = item.onRemove(filters)
                                onChange(newFilters)
                            } : null}
                            onClick={item.isRemovable ? null : () => {
                                if (!onChange) return;
                                const newFilters = item.onToggle(filters)
                                onChange(newFilters)
                            }}
                            clickable={!item.isRemovable}
                        />
                    </li>
                )
            })}
        </Box>
    );
}

export default FilterViewer;