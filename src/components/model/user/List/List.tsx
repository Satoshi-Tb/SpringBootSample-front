import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useListHook } from "./ListHook";

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
  } = useListHook();

  if (hasError) return <div>failed to load</div>;
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={rowData}
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
      />
    </Box>
  );
};
