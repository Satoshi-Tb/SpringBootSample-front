import { FilterItem } from "@/TypeDef";

import { Box, SvgIconProps, Typography } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view";
import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useFilterElementsHooks } from "./FilterElementsHooks";

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
  filterItemName: string;
  filterElementList: FilterItem[];
};

export const FilterElements = ({
  filterElementList,
  filterItemName,
}: Props) => {
  const { onFilterClick, filterOn, createItemId } = useFilterElementsHooks({
    filterItemName,
  });

  console.log(`${filterItemName}`, filterElementList);
  return filterElementList.map((item, idx) => (
    <TreeItem
      key={idx}
      itemId={createItemId(item)}
      label={
        <CustomLabel
          icon={filterOn ? CheckBoxIcon : CheckBoxOutlineBlankIcon}
          labelText={`${item.filterLabel} (${item.count})`}
        />
      }
      onClick={() => {
        onFilterClick(item);
      }}
    ></TreeItem>
  ));
};
