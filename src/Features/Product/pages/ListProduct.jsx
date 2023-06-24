import { Container, Grid, Pagination, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import productsApi from "api/productsApi";
import queryString from 'query-string';
import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterViewer from "../components/filter/FilterViewer";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import SkeletonProductList from "../components/SkeletonProductList";

ListProduct.propTypes = {

};

function ListProduct(props) {
    const [productList, setProductList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        console.log("search", params);
        return ({
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || "salePrice:ASC",
            isPromotion: params.isPromotion === "true",
            isFreeShip: params.isFreeShip === "true"
        })
    }, [location.search])


    const [pagination, setPagination] = useState({
        limit: 12,
        total: 12
    })
    // const [fillterProduct, setFillterProduct] = useState({

    //     _page: 1,
    //     _limit: 12,
    //     _sort: "salePrice:ASC"
    // })
    // const [fillterProduct, setFillterProduct] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: queryParams._sort || "salePrice:ASC"
    // }))
    // sync filter to url
    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(queryParams)
    //     })
    // }, [history, queryParams])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await productsApi.getAll(queryParams)
            const { data } = res.data
            const { pagination } = res
            setProductList(data)
            setPagination(pagination)
            console.log("pagination ", pagination);
        }
        fetchApi()
        setIsLoading(false)
    }, [queryParams])

    const hanleOnchangPage = (e, page) => {
        const newFilters = {
            ...queryParams,
            _page: page
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        })
    }
    const handlSortChange = (newValue) => {
        const newFilters = {
            ...queryParams,
            _sort: newValue
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        })
    }

    const handlFiltersChange = (newFilters) => {

        const newFilter = {
            ...queryParams,
            ...newFilters
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter)
        })
    }

    const setFilter = (values) => {

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(values)
        })


    }
    return (
        <Box sx={{ marginTop: "16px" }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper elevation={0}>
                            <ProductFilter onChange={handlFiltersChange} filters={queryParams} />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper elevation={0} sx={{ paddingBottom: "16px" }}>
                            <ProductSort onChange={handlSortChange} currentSort={queryParams._sort} />
                            <FilterViewer onChange={setFilter} filters={queryParams} />
                            {isLoading ? <SkeletonProductList length={12} /> : <ProductList data={productList} />}
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Pagination sx={{ margin: "16px 0 0 0 " }} page={pagination.page || 1} count={Math.ceil(pagination.total.data / pagination.limit) || 10} color="primary" onChange={hanleOnchangPage} />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}

export default ListProduct;