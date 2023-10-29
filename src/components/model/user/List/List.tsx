import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useListHook } from "./ListHook";

export const List = () => {
  const { rowData, hasError, isLoading, columns } = useListHook();

  if (hasError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Box>
      <DataGrid columns={columns} rows={rowData} disableRowSelectionOnClick />
    </Box>
  );
};
