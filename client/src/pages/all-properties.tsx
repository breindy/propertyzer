import { useMemo } from "react";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useTable } from "@pankod/refine-core";

import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";

import { PropertyCard, CustomButton } from "components/common";

import { Add } from "@mui/icons-material";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currPrice = sorter.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currPrice === "asc" ? "desc" : "asc" }]);
  };

  const currFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => {
      return "field" in item ? item : [];
    });

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error...</Typography>;
  }

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            {!allProperties.length
              ? "There are no current properties to display"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                title={`Sort price ${currPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#475BE8"
                color="#FCFCFC"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currFilterValues.propertyType}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "propertyType",
                      operator: "eq",
                      value: e.target.value,
                    },
                  ]);
                }}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Apartment",
                  "Villa",
                  "Farmhouse",
                  "Condos",
                  "Townhouse",
                  "Duplex",
                  "Studio",
                  "Chalet",
                  "Single Family Home",
                  "Multi-Family Home",
                  "Other",
                ].map((propertyType: string) => {
                  return (
                    <MenuItem
                      key={propertyType}
                      value={propertyType.toLowerCase()}
                    >
                      {propertyType}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          All Properties
        </Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475BE8"
          color="#FCFCFC"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => {
          const { _id, id, title, location, price, photo } = property;
          return (
            <PropertyCard
              key={_id}
              id={id}
              title={title}
              price={price}
              location={location}
              photo={photo}
            ></PropertyCard>
          );
        })}
      </Box>

      {/* Pagination */}
      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => {}}
            backgroundColor="#475BE8"
            color="#FCFCFC"
            disabled={!(current > 1)}
          />
          <Box sx={{ xs: "hidden", sm: "flex" }} alignItems="center" gap="5px">
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Previous"
            handleClick={() => {}}
            backgroundColor="#475BE8"
            color="#FCFCFC"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue="10"
            onChange={(e) => {
              setPageSize(e.target.value ? Number(e.target.value) : 10);
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => {
              return (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
