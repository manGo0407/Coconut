import ProfilePage from './pages/ProfilePage/ProfilePage';
import AllChatsPage from './pages/AllChatsPage/AllChatsPage';
import FavoriteToursPage from './pages/FavoriteToursPage/FavoriteToursPage';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { allOrders, allTours, userCheckSession } from './redux/thunkActions';
import Home from './pages/HomePage/Home';
import AuthPage from './pages/AuthPage/AuthPage';
import Header from './pages/HeaderPage/Header';
import './App.css';
import OneTourPage from './pages/OneTourPage/OneTourPage';

import MyTours from './components/MyTours/MyTours';
import EditProfile from './components/EditProfile/EditProfile';

import NewTourPage from './pages/NewTourPage/NewTourPage';
// import Payment from "./pages/BookingPage/Payment";
import Index from './pages/BookingPage/Payment';

import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

import RestrictedRoute from './components/Secure/Secure';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewProfilePage from './pages/ProfilePage/NewProfilePage';
import IndexModal from './pages/BookingPage/IndexModal';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import NotFound404 from './pages/notFound/NotFound404';

function App() {
  const user = useAppSelector((store) => store.userSlice.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(allTours());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(userCheckSession());
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`tour/:id`} element={<OneTourPage />} />

        <Route path="lk" element={<NewProfilePage selectedTab={0} />} />
        <Route
          path={
            user.role !== 'Турист'
              ? user.isAdmin === true
                ? '/lk/usersModerate'
                : '/lk/requests'
              : '/lk/paid'
          }
          element={<NewProfilePage selectedTab={1} />}
        />
        <Route
          path={
            user.role !== 'Турист'
              ? user.isAdmin === true
                ? '/lk/commentsModerate'
                : '/lk/active'
              : '/lk/reserved'
          }
          element={<NewProfilePage selectedTab={2} />}
        />
        <Route path="*" element={<NotFound404 />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route
          path="resetPassword/:token"
          element={<ChangePassword user={user} />}
        />

        <Route
          path="/newTour"
          element={
            <>
              <RestrictedRoute />
              <NewTourPage />
            </>
          }
        />

        <Route
          path="/auth"
          element={
            <>
              <RestrictedRoute />
              <ToastContainer />
              <AuthPage />
            </>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
