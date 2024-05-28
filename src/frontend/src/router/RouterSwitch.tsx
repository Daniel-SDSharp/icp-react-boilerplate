  import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ALLOWANCES, CONTACTS, HOME, LOGIN } from './paths';
import Dashboard from '../layouts/dashboard';

const Login = lazy(() => import('../pages/auth'));
const Home = lazy(() => import('../pages/home'));
const Contacts = lazy(() => import('../pages/contacts'));
const Allowances = lazy(() => import('../pages/allowances'));

// TODO: Setup auth-dependant Route component 
const RouterSwitch: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Dashboard><Home/></Dashboard>} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={CONTACTS} element={<Dashboard><Contacts /></Dashboard>} />
      <Route path={ALLOWANCES} element={<Dashboard><Allowances /></Dashboard>} />
    </Routes>
  );
};

export default RouterSwitch;
