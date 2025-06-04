import React from "react";
import { TextField, MenuItem } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
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
          height: "56px",
          width: "100%",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {},
          "&.Mui-focused fieldset": {
            borderColor: "var(--sweetcorn-600)",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "1rem",
          "&.Mui-focused": {
            color: "var(--sweetcorn-600)",
          },
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
      {options.map((option) => (
        <MenuItem
          key={option.title}
          value={option.title}
          sx={{
            minHeight: "36px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {option.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelect;
