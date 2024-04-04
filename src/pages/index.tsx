import { Grid } from "@mui/material";

import { TableCompare } from "src/shared/components/TableCompare/TableCompare";
import {
  initialDataTableCompare,
  initialNewDataTableCompare,
} from "src/shared/constants/TableCompareValues";

export default function Index() {
  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"100vh"}
      p={2}
    >
      <Grid
        mt={10}
        container
        maxWidth={"90%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
      >
        <TableCompare
          currentDataProp={initialDataTableCompare}
          newDataProp={initialNewDataTableCompare}
        />
      </Grid>
    </Grid>
  );
}
