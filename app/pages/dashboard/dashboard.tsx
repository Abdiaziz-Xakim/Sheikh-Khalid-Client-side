"use client"
import React from "react";
import { Box } from "@mui/material";
// import DataRibbon from "@/components/Dashboard/DataRibbon";
// import TransactionsPerDay from "@/components/Dashboard/TransactionsPerDay";
// import TransactionBottomRow from "@/components/Dashboard/TransactionBottomRow";
import Grid from "@mui/material/Grid";
import DataRibbon from "@/app/components/Dashboard/DataRibbon";
import TransactionsPerDay from "@/app/components/Dashboard/TransactionsPerDay";
import TransactionBottomRow from "@/app/components/Dashboard/TransactionBottomRow";

const Dashboard = () => {
  return (
    <Box>
      <Grid container gap={4} marginTop={10}>
        <DataRibbon />
        <TransactionsPerDay />
      </Grid>
      <TransactionBottomRow />
    </Box>
  );
};
export default Dashboard;