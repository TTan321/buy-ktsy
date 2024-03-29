import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Products from './components/products/getProducts';
import CreateProductForm from './components/products/productForm';
import ProductDetail from './components/products/productDetail';
import { ReviewForm } from './components/reviews/reviewform';
import { UpdateReviewForm } from './components/reviews/updateReviewForm';
import CartForm from './components/ShoppingCart/CartForm';
import GetCartItems from './components/ShoppingCart/ShoppingCart';
import EditProductForm from './components/products/EditProductForm';
import UserProducts from './components/products/UserProducts';
import SearchProducts from './components/products/searchProducts';
import ReactGA from 'react-ga';
import RouteChangeTracker from './components/RouteChangeTracker'


function App() {
  const TRACKING_ID = "G-9DGC3CQ2XG";
  ReactGA.initialize(TRACKING_ID);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <NavBar loaded={loaded} />
      <Switch>
        <ProtectedRoute path='/products/owner' exact={true}>
          <UserProducts />
        </ProtectedRoute>
        <ProtectedRoute path='/products/new' exact={true}>
          <CreateProductForm />
        </ProtectedRoute>
        <ProtectedRoute path='/:productId/review/:reviewId/update' exact={true}>
          <UpdateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/review/new' exact={true}>
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/edit'>
          <EditProductForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/carts/new' exact={true}>
          <CartForm />
        </ProtectedRoute>
        <Route path='/search'>
          <SearchProducts />
        </Route>
        <ProtectedRoute path='/shopping-carts' exact={true}>
          <GetCartItems />
        </ProtectedRoute>
        <Route path="/products/:productId" exact={true}>
          <ProductDetail />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Products />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm ReactGA={ReactGA} />
        </Route>
        <Route>
          <h1>Route Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
