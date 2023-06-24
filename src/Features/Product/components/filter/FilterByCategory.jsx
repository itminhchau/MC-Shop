import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

FilterByCategory.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
    li: {
        cursor: "pointer",
    }
})
function FilterByCategory({ onChange }) {
    const [listCategory, setListCategory] = useState([])
    const classes = useStyles()

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await categoryApi.getAll()
                const { data } = res
                const newObjCategory = data.map((x) => {
                    return ({
                        id: x.id,
                        name: x.name
                    })
                }
                )
                setListCategory(newObjCategory)
                console.log("res by category", res);
            } catch (error) {
                console.log("fetch api categroy error", error);
            }
        }
        fetchAPI()
    }, [])

    const handleOnclickCategory = (category) => {
        if (onChange) {
            onChange(category.id)
            console.log("categroy id", category.id);
        }
    }
    return (
        <Box padding="8px">
            <Typography sx={{ fontWeight: 600 }}>Danh Mục Sản Phẩm</Typography>
            <ul>
                {listCategory && listCategory.map((item) => {
                    return (
                        <li key={item.id} onClick={() => handleOnclickCategory(item)}
                            className={classes.li}
                        >
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </Box>
    );
}

export default FilterByCategory;