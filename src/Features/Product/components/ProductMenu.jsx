import { Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {

};
const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0',
        justifyContent: 'center',
        listStyle: 'none',
        '& > li': {
            padding: '8px'
        },
        '& > li > a': {
            color: 'gray'
        },
        '& > li> a.active': {
            color: 'blue'
        }
    }
})
function ProductMenu(props) {
    const classes = useStyles()
    const { url } = useRouteMatch()
    return (
        <Box component='ul' className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>Discription</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>Additional Information</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>Reviews</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;