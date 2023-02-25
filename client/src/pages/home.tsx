import React from "react";

import { Typography, Box, Stack } from "@pankod/refine-mui";

import { useList } from "@pankod/refine-core";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
} from "../components/charts";
const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#475AE8", "#E4B8EF"]}
        />
        <PieChart
          title="Total Customers"
          value={54684}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart
          title="Total Cities"
          value={78}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      {/* <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row" }}>
        <PropertyCard />
      </Stack> */}
    </Box>
  );
};

export default Home;
