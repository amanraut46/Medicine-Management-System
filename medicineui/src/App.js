import './App.css';
import React,{Suspense,lazy} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const DisplayMedicine = lazy(() => import('./DisplayMedicine'));
const MedicineDetails = lazy(() => import('./pages/MedicineDetails'));
const UpdateMedicine = lazy(() => import('./pages/UpdateMedicine'));
const AddMedicine = lazy(() => import('./pages/AddMedicine'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <Routes>
          <Route path="/" element={<DisplayMedicine />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
          <Route path="/updatemedicine/:id" element={<UpdateMedicine />} />
          <Route path="/addmedicine" element={<AddMedicine />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
