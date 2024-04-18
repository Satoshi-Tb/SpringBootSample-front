import { FilterNameTYpe } from "@/TypeDef";
import { Box, SvgIconProps, Typography } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view";
import React from "react";
import { FilterElements } from "./FilterElements";
import { useFilterItemHooks } from "./FilterItemHooks";

type CustomLabelProps = {
  icon: React.ElementType<SvgIconProps>;
  labelText: string;
};

const CustomLabel: React.FC<CustomLabelProps> = ({ icon: Icon, labelText }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Icon />
      <Typography variant="body1">{labelText}</Typography>
    </Box>
  );
};

type Props = {
  filterItemName: FilterNameTYpe;
  filterLabel: string;
};

export const FilterItem = ({ filterItemName, filterLabel }: Props) => {
  const { userFilterData, hasError, isLoading } = useFilterItemHooks({
    filterItemName,
  });

  console.log(`FilterItem ${filterItemName}`, userFilterData);

  return (
    <TreeItem itemId={filterItemName} label={filterLabel}>
      {hasError ? (
        <TreeItem itemId={`${filterItemName}.error`} label="エラー"></TreeItem>
      ) : isLoading ? (
        <TreeItem
          itemId={`${filterItemName}.loading`}
          label="ローディング"
        ></TreeItem>
      ) : (
        <FilterElements
          filterElementList={userFilterData?.data || []}
          filterItemName={filterItemName}
        />
      )}
    </TreeItem>
  );
};
