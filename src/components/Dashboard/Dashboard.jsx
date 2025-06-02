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
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => {
      const value = params.row.price;
      return value !== undefined && value !== null
        ? `$${Number(value).toFixed(2)}`
        : "";
    },
  },
  {
    field: "pricePer100g",
    headerName: "Price per 100g",
    type: "number",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const value = params.row.pricePer100g;
      return value !== undefined && value !== null
        ? `$${Number(value).toFixed(2)}`
        : "";
    },
  },
  {
    field: "pricePerGram",
    headerName: "Price per Gram",
    type: "number",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const value = params.row.pricePerGram;
      return value !== undefined && value !== null
        ? `$${Number(value).toFixed(4)}`
        : "";
    },
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => {
      const value = params.row.date;
      if (!value) return "";
      try {
        return new Date(value).toLocaleDateString();
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    },
  },
];

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Load initial product list
  useEffect(() => {
    fetch(`${API_URI}/`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        setAllProducts([]);
      });
  }, []);

  // Load selected product history
  useEffect(() => {
    if (!selectedProduct) {
      // When no product is selected, fetch all products history
      fetch(`${API_URI}/dashboard/all`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          setProducts([]);
        });
      return;
    }

    fetch(`${API_URI}/dashboard/${selectedProduct}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        setProducts([]);
      });
  }, [selectedProduct]);

  // Format and filter products
  const filteredProducts = products
    .filter((product) => {
      if (
        !product ||
        !product.title ||
        typeof product.title !== "string" ||
        product.title.trim() === ""
      ) {
        return false;
      }

      if (!product?.date) return false;
      try {
        const productDate = new Date(product.date);
        const matchesStartDate = !startDate || productDate >= startDate;
        const matchesEndDate = !endDate || productDate <= endDate;
        return matchesStartDate && matchesEndDate;
      } catch (error) {
        return false;
      }
    })
    .map((product, index) => ({
      id: index,
      title: product.title.trim(),
      price: typeof product.price === "number" ? product.price : 0,
      pricePer100g:
        typeof product.pricePer100g === "number" ? product.pricePer100g : 0,
      pricePerGram:
        typeof product.pricePerGram === "number" ? product.pricePerGram : 0,
      date: product.date ? new Date(product.date) : null,
    }))
    .sort((a, b) => {
      if (!a.title || !b.title) return 0;
      return a.title.localeCompare(b.title);
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
                  {allProducts.map((product) => (
                    <MenuItem
                      key={product.title}
                      value={product.title}
                      sx={{
                        minHeight: "36px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {product.title}
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
              getRowHeight={() => "auto"}
              sx={{
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell": {
                  whiteSpace: "normal",
                  lineHeight: "normal",
                  padding: "8px 16px",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
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
