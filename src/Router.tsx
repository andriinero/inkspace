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
import RecentPosts from './features/profile/components/RecentPosts';
import FollowedUsers from './features/profile/components/FollowedUsers';

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
              element: <FollowedUsers />,
            },
            {
              index: true,
              path: '/profile/ignored-users',
              element: <></>,
            },
          ],
        },
        { path: '/profile/edit', element: <ProfileEditPage /> },
        { path: '/authors/:authorid', element: <AuthorPage /> },
      ],
      errorElement: <NotFound404 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
