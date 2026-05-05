import './App.css';
import DisplayMedicine from './DisplayMedicine';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MedicineDetails from './pages/MedicineDetails';
import UpdateMedicine from './pages/UpdateMedicine';
import AddMedicine from './pages/AddMedicine';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayMedicine />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/updatemedicine/:id" element={<UpdateMedicine />} />
        <Route path="/addmedicine" element={<AddMedicine />} />
      </Routes>
    </Router>
  );
}

export default App;
