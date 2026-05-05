import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMedicine } from '../features/medicine/medicineThunks';
import { TextField,Button,Box,Typography } from '@mui/material';
export default function AddMedicine() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [medicine, setMedicine] = useState({
        brand: '',
        name: '',
        price: '',
        quantity: '',
        expirate_Date: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicine((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        dispatch(createMedicine(medicine )).then(() => {
            navigate('/');
        });
    };
    const formatDate = (date) => {
        if (!date) return '';
            return new Date(date).toISOString().split('T')[0];
    };
  return (
    <Box className='container' component="form"  onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        
         <Typography variant="h4" gutterBottom>AddMedicine</Typography>
        <Typography variant="h4" gutterBottom>Update Medicine</Typography>
             <TextField 
             fullWidth
             label="Name" 
             value={medicine.name}
             onChange={(e) => setMedicine({...medicine, name: e.target.value})}
             margin="normal"
             required
            />
            <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={medicine.brand}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={medicine.quantity}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Expiry Date"
                name="expirate_Date"
                type="date"
                value={formatDate(medicine.expirate_Date)}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
               <TextField
                fullWidth
                label="Note"
                name="note"
                value={medicine.note}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={medicine.price}
                onChange={handleChange}
                margin="normal"
                required
              />
                
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                  Add
                </Button>
                <Button variant="outlined" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </Box>
        
    </Box>
  )
}
