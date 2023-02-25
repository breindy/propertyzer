import { useNavigate } from "@pankod/refine-react-router-v6";
import { useList } from "@pankod/refine-core";

import { Box, Stack, Typography } from "@pankod/refine-mui";

import { PropertyCard, CustomButton } from "components/common";

import { Add } from "@mui/icons-material";

const AllProperties = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          All Properties
        </Typography>
        <CustomButton title="Add Property" handleClick={() => navigate("/properties/create")} backgroundColor="#475BE8" color="#FCFCFC" icon={<Add />}/>
      </Stack>
    </Box>
  );
};

export default AllProperties;
