
import { Switch, useRouteMatch, Route } from "react-router-dom";
import DetailProduct from "./pages/DetailProduct";
import ListProduct from "./pages/ListProduct";

ProductFeature.propTypes = {

};

function ProductFeature(props) {
    const match = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route path={match.url} exact component={ListProduct} />
                <Route path={`${match.url}/:id`} component={DetailProduct} />
            </Switch>
        </div>
    );
}

export default ProductFeature;