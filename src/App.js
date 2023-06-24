import About from "Features/About/About";
import CartFeature from "Features/Cart/Index";
import HomePage from "Features/HomePage";
import ProductFeature from "Features/Product";
import {
  Route, Switch
} from "react-router-dom";
import Header from "./Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={About} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
      </Switch>
    </div>
  );
}

export default App;
