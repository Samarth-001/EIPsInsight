import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ProtectedLogin from './components/protectedLogin'
import ProtectedRoute from './components/ProtectedRoutes'
import { UserAuthContextProvider } from './Context/AuthContext'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import ForgotPassword from './views/pages/ForgotPassword/ForgotPassword'
import MForm from './views/pages/ManualForm/mForm'
import MForm2 from './views/pages/ManualForm/mForm2'
import ResetPassword from './views/pages/ResetPassword/resetPassword'
import { useUserAuth } from 'src/Context/AuthContext'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.js'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <UserAuthContextProvider>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={
                <ProtectedLogin>
                  <Login />
                </ProtectedLogin>
              }
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route
              exact
              path="/forgotPassword"
              name="Forgot Password"
              element={<ForgotPassword />}
            />
            <Route exact path="/resetPassword" name="Reset Password" element={<ResetPassword />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route
              path="/form"
              name="Form"
              element={
                <ProtectedRouteAdmin>
                  <MForm />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/updateForm"
              name="Update Form"
              element={
                <ProtectedRouteAdmin>
                  <MForm2 />
                </ProtectedRouteAdmin>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </Suspense>
    </HashRouter>
  )
}

export default App