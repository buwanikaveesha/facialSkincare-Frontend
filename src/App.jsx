import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import HowToDo from './pages/HowToDo/HowToDo';
import Features from './pages/Features/Features';
import Layout from './Layout/Layout';
import Profile from './pages/Profile/Profile';
import StartAnalysis from './pages/StartAnalysis/StartAnalysis';
import Instructions from './components/Instructions/Instructions';
import History from './components/History/History';
import Analysis from './pages/Analysis/Analysis';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '',
          element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/signup',
          element: <Signup/>
        },
        {
          path: '/contact-us',
          element: <ContactUs/>
        },
        {
          path: '/faq',
          element: <FAQ/>
        },
        {
          path: '/howToDo',
          element: <HowToDo/>
        },
        {
          path: '/features',
          element: <Features/>
        },
        {
          path: '/profile/:id',
          element: <Profile/>
        },
        {
          path: '/start-analysis',
          element: <StartAnalysis/>
        },
        {
          path: '/instructions',
          element: <Instructions/>
        },
        {
          path: '/analysis',
          element: <Analysis/>
        },
        {
          path: '/history',
          element: <History/>
        },
      ]
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App;