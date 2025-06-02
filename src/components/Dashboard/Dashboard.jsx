import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid } from "@mui/x-data-grid";

const API_URI = process.env.REACT_APP_API_URI;

const columns = [
  { field: "title", headerName: "Title", flex: 1 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
    valueFormatter: (params) => {
      if (params.value == null) return "";
      return `$${params.value.toFixed(2)}`;
    },
  },
  {
    field: "pricePer100g",
    headerName: "Price per 100g",
    type: "number",
    flex: 1,
    valueFormatter: (params) => {
      if (params.value == null) return "";
      return `$${params.value.toFixed(2)}`;
    },
  },
  {
    field: "pricePerGram",
    headerName: "Price per Gram",
    type: "number",
    flex: 1,
    valueFormatter: (params) => {
      if (params.value == null) return "";
      return `$${params.value.toFixed(2)}`;
    },
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    flex: 1,
    valueFormatter: (params) => {
      if (params.value == null) return "";
      return new Date(params.value).toLocaleDateString();
    },
  },
];

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");
    fetch(`${API_URI}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const uniqueProducts = [...new Set(products.map((product) => product.title))];

  const filteredProducts = products.filter((product) => {
    const productDate = new Date(product.date);
    const matchesProduct =
      !selectedProduct || product.title === selectedProduct;
    const matchesStartDate = !startDate || productDate >= startDate;
    const matchesEndDate = !endDate || productDate <= endDate;

    return matchesProduct && matchesStartDate && matchesEndDate;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Filters Section */}
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select Product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  sx={{
                    "& .MuiSelect-select": {
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      height: "56px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1rem",
                      padding: "8px 14px",
                    },
                    "& .MuiInputBase-root": {
                      height: "52px",
                      width: "100%",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        height: "56px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1rem",
                    },
                    width: "100%",
                    minWidth: "400px",
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          minWidth: "400px",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="" sx={{ minHeight: "36px" }}>
                    All Products
                  </MenuItem>
                  {uniqueProducts.map((title) => (
                    <MenuItem
                      key={title}
                      value={title}
                      sx={{
                        minHeight: "36px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  sx={{
                    "& .MuiPickersInputBase-root": {
                      height: "52px",
                    },
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  sx={{
                    "& .MuiPickersInputBase-root": {
                      height: "52px",
                    },
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Products Table Section */}
          <Paper sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={filteredProducts}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              sx={{
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
              }}
            />
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Dashboard;
