import { Box, Container, Grid, LinearProgress, Paper } from "@mui/material";
import { STATIC_HOST, THUMBNAIL_PLACEHODER } from "constants";
import PropTypes from 'prop-types';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import ProductAdditional from "../components/ProductAdditional";
import ProductDescription from "../components/ProductDescription";
import ProductInfor from "../components/ProductInfor";
import ProductMenu from "../components/ProductMenu";
import ProductReview from "../components/ProductReview";
import useDetailProduct from "../hook/useDetailProduct";

DetailProduct.propTypes = {
    product: PropTypes.object,
};

function DetailProduct() {

    const { id } = useParams();
    console.log("match", id);
    const { isLoading, product } = useDetailProduct(id)
    const thumbnailUrl = product.thumbnail && product.thumbnail?.url ?
        `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHODER;
    const { url } = useRouteMatch()
    console.log("url", url);

    const handleAddToCart = (value) => {
        console.log("check value add to cart", value);
    }
    if (isLoading) {
        return (
            <Box sx={{ position: 'fixed', top: '0', left: '0', width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
    return (
        <>
            <Box sx={{ margin: "16px 0 0 0" }}>
                <Container >
                    <Grid container spacing={0.3}>
                        <Grid item xs={4}>
                            <Paper sx={{ padding: "16px" }}>
                                <img src={thumbnailUrl} alt="" />

                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper sx={{ padding: '8px', minHeight: '380px' }}>
                                <ProductInfor product={product} />
                                <AddToCartForm onSubmit={handleAddToCart} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <ProductMenu />
                    <Switch>
                        <Route path={url} exact>
                            <ProductDescription product={product} />
                        </Route>
                        <Route path={`${url}/additional`} component={ProductAdditional} />
                        <Route path={`${url}/reviews`} component={ProductReview} />
                    </Switch>
                </Container>

            </Box>
        </>
    );
}

export default DetailProduct;