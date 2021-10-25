import { Switch, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Products from './pages/Products';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/products" component={Products} />
    </Switch>
  );
};

export default Routes;
