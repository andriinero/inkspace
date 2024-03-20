import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/App';
import Home from './pages/Home';
import SinglePagePost from './pages/SinglePagePost';
import NotFound404 from './pages/NotFound404';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import AuthorPage from './pages/AuthorPage';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: '/posts/:postid', element: <SinglePagePost /> },
        { path: '/create-post', element: <CreatePost /> },
        { path: '/profile', element: <Profile /> },
        { path: '/authors/:authorid', element: <AuthorPage /> },
      ],
      errorElement: <NotFound404 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
