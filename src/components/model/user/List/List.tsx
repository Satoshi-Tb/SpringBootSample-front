import { Box } from "@mui/material";
import { DataGrid, GridCellEditStopParams, MuiEvent } from "@mui/x-data-grid";
import { useListHook } from "./ListHook";
import { useUpdateUser } from "@/components/usecase/useUserMutator";
import { useSWRMutator } from "@/components/usecase/useSWRMutator";
import { useListSearchConditionState } from "@/components/store/useListSearchConditionState";

export const List = () => {
  // 照会
  const { rowData, hasError, isLoading, columns } = useListHook();

  //再読込
  const condition = useListSearchConditionState();
  const { mutate } = useSWRMutator();

  // 更新処理
  const { trigger: updateUser, error, data } = useUpdateUser();

  // セル編集処理
  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    console.log("new row", newRow);
    console.log("old row", oldRow);

    try {
      const result = await updateUser({
        id: newRow.id,
        userId: newRow.userId,
        userName: newRow.userName,
        password: newRow.password,
      });
      console.log("更新結果", result);
      console.log("更新データ", data);

      // 更新後データ再読込
      console.log("condition", condition);
      const key = `http://localhost:8080/api/user/get/list${condition}`;
      mutate(key);

      // DB更新が成功した場合、新しい行データを返してグリッドにコミットする
      return newRow;
    } catch (e) {
      console.log(e);
      // DB更新に失敗した場合は、変更を破棄する
      return oldRow;
    }
  };

  if (hasError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
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
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
};
