import {Layout, Button, Menu} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router';
import {logout, setCredentials} from '../../auth/authSlice';
import {useGetUserDetailsQuery} from '../../auth/authService';
const {Header} = Layout;
const Navbar = () => {
  const [menuItems, setMenuItems] = useState ([]);
  const [currentActiveLink, setCurrentActiveLink] = useState ('1');
  const {userInfo} = useSelector (state => state.auth);
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  // automatically authenticate user if token is found
  const {data} = useGetUserDetailsQuery ('userDetails', {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });
  // console.log (data);
  useEffect (
    () => {
      if (data) dispatch (setCredentials (data));
    },
    [data, dispatch]
  );
  useEffect (
    () => {
      const handleLogout = () => {
        dispatch (logout ());
        navigate ('/login');
      };
      const items = [{key: '1', label: <Link to="/">Home</Link>}];
      if (userInfo) {
        items.push ({key: '2', label: <Link to="/user-profile">Profile</Link>});
        items.push ({
          key: '3',
          label: (
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          ),
        });
      } else {
        items.push ({key: '2', label: <Link to="/login">Login</Link>});
        items.push ({key: '3', label: <Link to="/register">Register</Link>});
      }

      setMenuItems (items);
    },
    [userInfo, dispatch, navigate]
  );
  let location = useLocation ();

  useEffect (
    () => {
      if (location.pathname === '/') {
        setCurrentActiveLink ('1');
      } else if (location.pathname === '/login') {
        setCurrentActiveLink ('2');
      } else if (location.pathname === '/register') {
        setCurrentActiveLink ('3');
      } else if (location.pathname === '/user-profile') {
        setCurrentActiveLink ('2');
      }
    },
    [location]
  );
  return (
    <Header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={currentActiveLink}
        items={menuItems}
      />
    </Header>
  );
};

export default Navbar;
