import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchMedicineById } from '../features/medicine/medicineThunks';
import { useEffect } from 'react';
export default function MedicineDetails() {
    const {id} = useParams();
    console.log("MedicineDetails component rendered with ID:", id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {selectedMedicine, loading, error
      } = useSelector((state) => state.medicine);

    useEffect(() => {
        console.log("Fetching medicine details for ID:", id);
        dispatch(fetchMedicineById(id));
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if(!selectedMedicine) {
        return <div>Medicine not found</div>;
    }
  return (
    <div className="container">
      <h2>Medicine Details</h2>
      <p><strong>ID:</strong> {selectedMedicine.id}</p>
      <p><strong>Brand:</strong> {selectedMedicine.brand}</p>
      <p><strong>Name:</strong> {selectedMedicine.name}</p>
      <p><strong>Note:</strong> {selectedMedicine.note}</p>
      <p><strong>Quantity:</strong> {selectedMedicine.quantity}</p>
      <p><strong>Expiry Date:</strong> {selectedMedicine.expiry_Date}</p>
      <p><strong>Price:</strong> {selectedMedicine.price}</p>
      <button onClick={() => navigate('/')}>Back to List</button> 
    </div>
  )
}
