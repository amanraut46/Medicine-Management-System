import React from 'react'
import {DataGrid} from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import { fetchMedicines ,fetchMedicineByName} from './features/medicine/medicineThunks';
import { useEffect,useState } from 'react';

const isExpiringSoon = (date) => {
  const today = new Date();
  const expiry = new Date(date);
  const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
  return diffDays < 30;
};

const isLowStock = (qty) => qty < 10;

export default function DisplayMedicine() {
  const dispatch = useDispatch();
  // ✅ Get data from Redux
  const { medicines, loading } = useSelector((state) => state.medicine);
  const [sortModel, setSortModel] = useState([
    {
      field: 'name',
      sort: 'asc',
    },
  ]);
  const [searchMedicine, setSearchMedicine] = useState('');
  useEffect(() => {
    const sortBy = sortModel[0]?.field || 'name';
    const sortDir = sortModel[0]?.sort || 'asc';
    dispatch(fetchMedicines({
      sortBy: sortBy,
      sortDir: sortDir
    }));
  }, [dispatch, sortModel]);

  useEffect(() => {
    if (!searchMedicine.trim()) return;
    dispatch(fetchMedicineByName(searchMedicine));
  }, [dispatch,searchMedicine]);

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'quantity', headerName: 'Quantity', width: 130, cellClassName: (params) => isLowStock(params.value) ? 'low-stock' : '' },
  { field: 'expirate_Date', headerName: 'Expiry Date', width: 150, cellClassName: (params) => isExpiringSoon(params.value) ? 'expiring-soon' : '' },
];
  return (
    <div  className="container">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by medicine name"
          value={searchMedicine}
          onChange={(e) => setSearchMedicine(e.target.value)}
          style={{ width: 240, padding: 8 }}
        />
        {/* <button className="btn btn-primary ms-2">Add Medicine</button> */}
      </div>
      <DataGrid 
      rows={medicines} 
      columns={columns} 
      loading={loading}
      sortingMode='server'
      sortModel={sortModel}
      onSortModelChange={(newModel)=>setSortModel(newModel)}
      getRowClassName={(params)=>{
        if (isExpiringSoon(params.row.expirate_Date)) return 'row-expiring';
        if (isLowStock(params.row.quantity)) return 'row-lowstock';
        return '';
      }}
      pageSize={5} />
    </div>
  )
}
