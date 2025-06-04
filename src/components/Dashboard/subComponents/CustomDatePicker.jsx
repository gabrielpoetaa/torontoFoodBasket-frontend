import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ce8711",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {},
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
          ".MuiOutlinedInput-notchedOutline": {},
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {},
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ce8711",
        },
      },
    },
  },
});

const CustomDatePicker = ({ label, value, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="dd/MM/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
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
            }}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default CustomDatePicker;
