import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import IndexLayout from './pages/indexPage/index';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<IndexLayout />}></Route>)
  );

  return <RouterProvider router={router} />;
};

export default Router;
