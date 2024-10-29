import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BelongingTours from '../../components/BelongingTours/BelongingTours';
import Applications from '../../components/Applications/Applications';
import UserOrders from '../../components/UserOrders/UserOrders';
import UserPaidOrders from '../../components/UserPaidOrders/UserPaidOrders';
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay';
import { allOrders, allTours } from '../../redux/thunkActions';
import styles from './NewProfilePage.module.css';
import AdminRequests from '../../components/AdminRequests/AdminRequests';
import UsersList from '../../components/UsersList/UsersList';
import axios from 'axios';
import AdminCommentsList from '../../components/AdminCommentsList/AdminCommentsList';
import Footer from '../../components/Footer/Footer';
export default function NewProfilePage({ selectedTab }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ourToursOrders, setOurToursOrders] = useState([]);
  const [users, setUsres] = useState([]);
  const [comments, setComments] = useState([]);
  const user = useAppSelector((store) => store.userSlice.user);
  let tours = useAppSelector((store) => store.tourSlice.tours);
  const orders = useAppSelector((store) => store.orderSlice.orders);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (user.isAdmin === true) {
      axios
        .get(`${import.meta.env.VITE_APP_URL}/admin/users`)
        .then((res) => setUsres(res.data))
        .catch((err) => console.log(err));
      axios
        .get(`${import.meta.env.VITE_APP_URL}/admin/comments`)
        .then((res) => setComments(res.data))
        .catch((err) => console.log(err));
    }
  }, [user.id]);
  // console.log(comments);

  useEffect(() => {
    if (orders.length) {
      const ours = orders?.filter(
        (elem) => elem.contactId === user.id && elem.statusAccept === false
      );
      setOurToursOrders(ours);
    }
  }, [orders, user.id]);

  if (user.isAdmin === true) {
    tours = tours.filter((el) => el.adminAproved === false);
  }
  useEffect(() => {
    if (user.id) {
      dispatch(allOrders());
      dispatch(allTours());
    }
  }, [user.id]);

  if (user.role === 'Гид' && user.isAdmin === true) {
    return (
      <>
        <div className={styles.content}>
          <Tabs
            defaultIndex={selectedTab}
            colorScheme="red"
            isFitted
            variant="soft-rounded"
          >
            <TabList mb="1em">
              <Tab onClick={() => navigate('/lk')}>
                Завявки на рассмотрение туров {tours?.length}
              </Tab>
              <Tab onClick={() => navigate('/lk/usersModerate')}>
                Непроверенные пользователи {users?.length}
              </Tab>
              <Tab onClick={() => navigate('/lk/commentsModerate')}>
                Непроверенные комментарии {comments?.length}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminRequests tours={tours} />
              </TabPanel>
              <TabPanel>
                <UsersList users={users} setter={setUsres} />
              </TabPanel>
              <TabPanel>
                <AdminCommentsList comments={comments} setter={setComments} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <Footer />
      </>
    );
  } else if (user.role === 'Гид' && user.isAdmin === false) {
    return (
      <>
        <div className={styles.content}>
          <Tabs
            defaultIndex={selectedTab}
            colorScheme="green"
            isFitted
            variant="soft-rounded"
          >
            <TabList mb="1em">
              <Tab onClick={() => navigate('/lk')}>Мой профиль</Tab>
              <Tab onClick={() => navigate('/lk/requests')}>
                Заявки {ourToursOrders?.length}
              </Tab>
              <Tab onClick={() => navigate('/lk/active')}>
                Мои активные туры
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProfileDisplay />
              </TabPanel>
              <TabPanel>
                <Applications orders={ourToursOrders} />
              </TabPanel>
              <TabPanel>
                <BelongingTours id={user.id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className={styles.content}>
          <Tabs
            defaultIndex={selectedTab}
            colorScheme="green"
            isFitted
            variant="soft-rounded"
          >
            <TabList mb="1em">
              <Tab onClick={() => navigate('/lk')}>Мой профиль</Tab>
              <Tab onClick={() => navigate('/lk/paid')}>Оплаченные туры</Tab>
              <Tab onClick={() => navigate('/lk/reserved')}>
                Мои забронированные туры
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProfileDisplay />
              </TabPanel>
              <TabPanel>
                <UserPaidOrders orders={orders} />
              </TabPanel>
              <TabPanel>
                <UserOrders orders={orders} />
              </TabPanel>
            </TabPanels>
            <Outlet />
          </Tabs>
        </div>
        <Footer />
      </>
    );
  }
}
