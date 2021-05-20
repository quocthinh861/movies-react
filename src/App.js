import './App.css';
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';
import {BrowserRouter as Router, Container, Switch, Route} from 'react-router-dom';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';

function App() {
  return (
    <Router>
      <Header></Header>
      <div className='app'>
        <Switch>
          <Route path='/' component={Trending} exact/>
          <Route path='/movies' component={Movies}/>
          <Route path='/series' component={Series}/>
          <Route path='/search' component={Search}/>
        </Switch>
      </div>
      <SimpleBottomNavigation></SimpleBottomNavigation>
    </Router>
  );
}

export default App;
