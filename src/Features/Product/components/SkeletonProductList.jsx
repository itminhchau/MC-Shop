import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';

SkeletonProductList.propTypes = {
    length: PropTypes.number
};
SkeletonProductList.defaultProps = {
    length: 6
}

function SkeletonProductList({ length }) {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box p={1}>
                            <Skeleton variant="rectangular" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SkeletonProductList;