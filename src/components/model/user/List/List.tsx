import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useListHook } from "./ListHook";
import { useSampleAuthState } from "@/components/store/useSampleAuthState";

export const List = () => {
  // 照会
  const {
    rowData,
    rowCount,
    hasError,
    isLoading,
    columns,
    handlePaginationModelChange,
    handleProcessRowUpdate,
    handleRowSelectionModel,
  } = useListHook();

  if (hasError)
    return (
      <>
        <div>failed to load</div>
        <div>
          <p>{hasError.message}</p>
        </div>
      </>
    );
  return (
    <Box sx={{ height: "600" }}>
      <DataGrid
        columns={columns}
        rows={rowData}
        getRowId={(row) => row.userId}
        disableRowSelectionOnClick
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error(`Error while processing row update: ${error.message}`);
        }}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        loading={isLoading}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={rowCount}
        paginationMode="server"
        checkboxSelection
        keepNonExistentRowsSelected
        onRowSelectionModelChange={handleRowSelectionModel}
      />
    </Box>
  );
};
