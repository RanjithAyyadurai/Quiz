import React, {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {Layout, Menu, theme} from 'antd';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router';
import {logout} from '../auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const {Sider} = Layout;

function UserProfile () {
  const {token: {colorBgContainer}} = theme.useToken ();
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const {userInfo} = useSelector (state => state.auth);
  const handleLogout = () => {
    dispatch (logout ());
    navigate ('/login');
  };
  const items2 = [
    {key: '1', label: <Link to="/user-profile">User Info</Link>},
    {key: '2', label: <Link to="/user-profile/quiz">Quiz</Link>},
    {
      key: '3',
      label: (
        <div style={{color: 'red'}} onClick={handleLogout}>
          Logout
        </div>
      ),
    },
  ];

  useEffect (
    () => {
      if (!userInfo) {
        navigate ('/login');
      }
    },
    [userInfo, navigate]
  );

  return (
    <div>
      <Layout>

        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
              minHeight: '100vh',
            }}
          >

            <Outlet />
          </Layout>
        </Layout>
      </Layout>

    </div>
  );
}

export default UserProfile;
