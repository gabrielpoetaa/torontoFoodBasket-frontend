import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const CustomGrid = ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
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
  );
};

export default CustomGrid;
