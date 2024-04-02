import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/App';
import Home from './pages/Home';
import SinglePagePost from './pages/SinglePagePost';
import NotFound404 from './pages/NotFound404';
import PostForm from './pages/PostForm';
import Profile from './pages/Profile';
import AuthorPage from './pages/AuthorPage';
import ProfileEditPage from './pages/ProfileEditPage';
import BookmarkContainer from './features/profile/components/BookmarkContainer';
import RecentPosts from './features/profile/components/RecentPostItem';
import FollowedUserContainer from './features/profile/components/FollowedUserContainer';
import IgnoredUserContainer from './features/profile/components/IgnoredUserContainer';
import UsernameForm from './features/profileEdit/components/UsernameForm';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: '/posts/:postid', element: <SinglePagePost /> },
        { path: '/post-form', element: <PostForm /> },
        {
          path: '/profile',
          element: <Profile />,
          children: [
            { index: true, path: '/profile/bookmarks', element: <BookmarkContainer /> },
            { index: true, path: '/profile/your-posts', element: <RecentPosts /> },
            {
              index: true,
              path: '/profile/followed-users',
              element: <FollowedUserContainer />,
            },
            {
              index: true,
              path: '/profile/ignored-users',
              element: <IgnoredUserContainer />,
            },
          ],
        },
        {
          path: '/profile/edit',
          element: <ProfileEditPage />,
          children: [
            { path: '/profile/edit/email', element: <UsernameForm /> },
            { path: '/profile/edit/username', element: <UsernameForm /> },
            { path: '/profile/edit/bio', element: <UsernameForm /> },
            { path: '/profile/edit/password', element: <UsernameForm /> },
            { path: '/profile/edit/image', element: <UsernameForm /> },
          ],
        },
        { path: '/authors/:authorid', element: <AuthorPage /> },
      ],
      errorElement: <NotFound404 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
