import React from "./index";
import { Grid } from "@mui/material";
// import DataCard from "@/components/Dashboard/DataCard";
import scss from "./DataRibbon.module.scss";
import DataCard from "../DataCard";

const DataRibbon = () => {
  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title={"Total Students"}
          value={"106"}
          description={
            "The totals of Sheikh Khalid Secondary School in the current academic year"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Total Teachers"}
          value={"23"}
          description={"The total teachers"}
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Other Staffs"}
          value={"13"}
          description={
            "Non teaching Staffs"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Subjects"}
          value={"10"}
          description={"Learning Compulasory Subjects"}
        />
      </Grid>
    </Grid>
  );
};

export default DataRibbon;