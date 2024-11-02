import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './components/Home';
import RegisterRoute from './components/RegisterRoute';
import LoginRoute from './components/LoginRoute';
import CreatePostRoute from './components/CreatePostRoute';
import SearchUsersRoute from './components/SearchUsersRoute'; 
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App=()=>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-up" component={RegisterRoute} />
        <Route path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={Home}/>
        <ProtectedRoute exact path="/create-post" component={CreatePostRoute}/> 
        <ProtectedRoute exact path="/search-users" component={SearchUsersRoute}/>
      </Switch>
    </BrowserRouter>
  )
}


export default App;
