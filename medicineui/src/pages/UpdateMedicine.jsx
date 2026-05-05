import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchMedicineById,updateMedicine } from '../features/medicine/medicineThunks';
import { TextField,Button,Box,Typography,Alert } from '@mui/material';

export default function UpdateMedicine() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {selectedMedicine, loading, error} = useSelector((state) => state.medicine);
    const [formData, setFormData] = useState({
        name:'',
        brand:'',
        quantity:0,
        expirate_Date:'',
        note:'',
        price:0
    });
    useEffect(() => {
        dispatch(fetchMedicineById(id));
    }, [dispatch, id]);
    useEffect(() => {
        if (selectedMedicine) {
            setFormData({
                name: selectedMedicine.name,
                brand: selectedMedicine.brand,
                quantity: selectedMedicine.quantity,
                expirate_Date: selectedMedicine.expirate_Date,
                note: selectedMedicine.note,
                price: selectedMedicine.price
            })}},[selectedMedicine]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
}
const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMedicine({id, selectedMedicine: formData })).then(() => {
        navigate('/');
    }).catch((err) => {
        console.error("Failed to update medicine:", err)
        })
    };
const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};
if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!selectedMedicine) return <Typography>Medicine not found</Typography>;
  return (
   <Box className='container' component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
     <Typography variant="h4" gutterBottom>Update Medicine</Typography>
     <TextField 
     fullWidth
     label="Name" 
     value={formData.name}
     onChange={(e) => setFormData({...formData, name: e.target.value})}
     margin="normal"
     required
    />
    <TextField
        fullWidth
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Quantity"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Expiry Date"
        name="expirate_Date"
        type="date"
        value={formatDate(formData.expirate_Date)}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
       <TextField
        fullWidth
        label="Note"
        name="note"
        value={formData.note}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
        required
      />
        
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          Update
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Box>
    </Box>
    
  )
}
