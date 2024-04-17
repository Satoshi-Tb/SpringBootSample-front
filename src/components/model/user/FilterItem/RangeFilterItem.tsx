import { FilterItem, FilterNameTYpe } from "@/TypeDef";
import {
  useListSearchConditionMutators,
  useListSearchConditionState,
} from "@/components/store/useListSearchConditionState";
import { useUserFilter } from "@/components/usecase/useUserFilter";
import { Box, SvgIconProps, Typography } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

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
  filterName: FilterNameTYpe;
  filterLabel: string;
};

export const RangeFilterItem = ({ filterName, filterLabel }: Props) => {
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const condition = useListSearchConditionState();
  const { setListSearchCondition } = useListSearchConditionMutators();

  const { userFilterData, hasError, isLoading } = useUserFilter(
    filterName,
    condition
  );

  return (
    <TreeItem itemId={filterName} label={filterLabel}>
      {hasError ? (
        <TreeItem itemId={`${filterName}.error`} label="エラー"></TreeItem>
      ) : isLoading ? (
        <TreeItem
          itemId={`${filterName}.loading`}
          label="ローディング"
        ></TreeItem>
      ) : (
        userFilterData?.data.map((item, idx) => (
          <TreeItem
            key={idx}
            itemId={`${filterName}.${item.filterRangeValue!.from}`}
            label={
              <CustomLabel
                icon={filterOn ? CheckBoxIcon : CheckBoxOutlineBlankIcon}
                labelText={`${item.filterLabel} (${item.count})`}
              />
            }
            onClick={() => {
              //alert("click " + filterName);

              const toggleFilter = !filterOn;

              setFilterOn(toggleFilter);
              const newCond = { ...condition };
              switch (filterName) {
                case "age":
                  if (toggleFilter) {
                    newCond.ageFrom = item.filterRangeValue!.from;
                    newCond.ageTo = item.filterRangeValue!.to;
                  } else {
                    delete newCond.ageFrom;
                    delete newCond.ageTo;
                  }

                  break;

                default:
                  break;
              }

              console.log("new condition:", newCond);
              setListSearchCondition(newCond);
            }}
          ></TreeItem>
        ))
      )}
    </TreeItem>
  );
};
