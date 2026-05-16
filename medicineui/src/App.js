import './App.css';
import React,{Suspense,lazy} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PrivateRoute = lazy(() => import('./pages/PrivateRoute'));
const DisplayMedicine = lazy(() => import('./DisplayMedicine'));
const MedicineDetails = lazy(() => import('./pages/MedicineDetails'));
const UpdateMedicine = lazy(() => import('./pages/UpdateMedicine'));
const AddMedicine = lazy(() => import('./pages/AddMedicine'));
const Navbar = lazy(() => import('./pages/Navbar'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <Navbar />
        <Routes>
          <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
          <Route path="/" element={
            <PrivateRoute>
              <DisplayMedicine />
            </PrivateRoute>
          } />
          <Route path="/medicine/:id" element={
            <PrivateRoute>
              <MedicineDetails />
            </PrivateRoute>
          } />
          <Route path="/updatemedicine/:id" element={
            <PrivateRoute>
              <UpdateMedicine />
            </PrivateRoute>
          } />
          <Route path="/addmedicine" element={
            <PrivateRoute>
              <AddMedicine />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
