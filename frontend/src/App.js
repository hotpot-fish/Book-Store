import './App.css';
import LoginView from './view/LoginView';
import HomeView from './view/HomeView';
import BookView from './view/BookView';
import ShoppingCartView from './view/ShoppingCartView';
import SubmitView from './view/SubmitView';
import ManageView from './view/ManageView';
import LoginRoute from "./LoginRoute";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import BasicRoute from "./Router";

function App() {
  return (
      <BasicRoute/>
  );
}

export default App;
