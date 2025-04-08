import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridRowSelectionModel,
  GridSlotsComponentsProps,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useListHook } from "./ListHook";
import { useUserListSelectedRowIds } from "@/components/store/useUserListRowSelectionState";

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
    handleExcelDownload,
    selectedRowIds,
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
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            selectedRowIds,
            handleExcelDownload,
          },
        }}
      />
    </Box>
  );
};

// ツールバープロパティの拡張定義
declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    selectedRowIds: GridRowSelectionModel;
    handleExcelDownload: () => void;
    // 必要に応じて他のプロパティも追加
  }
}

const CustomToolbar = ({
  selectedRowIds,
  handleExcelDownload,
}: NonNullable<GridSlotsComponentsProps["toolbar"]>) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Button
        type="button"
        variant="contained"
        onClick={handleExcelDownload}
        disabled={!selectedRowIds || selectedRowIds.length === 0}
      >
        Excelダウンロード
      </Button>
    </GridToolbarContainer>
  );
};
