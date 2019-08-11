import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Header from './components/Header/index.js';
import Footer from './components/Footer/index.js';
import Login from './pages/Login/index.js';
import Produto from './pages/wms/cadastro/Produto'
import PedidoVenda from './pages/wms/expedicao/PedidoVenda'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/app" component={PageContainer} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);


const PageContainer = () => (
    <div>
        <Header/>
            <Switch>
                <Route exact path="/app" component={() => <h1>HELLO WORLD</h1>} />
                <Route exact path="/app/cadastro/produto" component={Produto} />
                <Route exact path="/app/expedicao/pedido-venda" component={PedidoVenda} />
            </Switch>
        <Footer/>
    </div>
  );

export default Routes;