import Main from './components/Main';
import Login from './components/Login';
import AddPlace from './components/AddPlace';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Main /> */}

      <Switch>
        <Route exact path='/' component={() => <Login loginProp={true} />} />
        <Route path='/login' component={() => <Login loginProp={true} />} />
        <Route path='/register' component={() => <Login loginProp={false} />} />
        <Route path='/places' component={Main} />
        <Route path='/addPlace' component={AddPlace} />
      </Switch>
    </Router>
  );
}

export default App;
