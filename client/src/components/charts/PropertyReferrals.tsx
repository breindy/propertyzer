import { Box, Typography, Stack } from "@pankod/refine-mui";

import { propertyReferralsInfo } from "constants/index";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => {
  return (
    <>
      <Box width="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize={16} fontWeight={500} color="#1142D">
            {title}
          </Typography>
          <Typography fontSize={16} fontWeight={500} color="#1142D">
            {percentage}%
          </Typography>
        </Stack>
      </Box>
      <Box
        mt={2}
        position="relative"
        width="100%"
        height="8px"
        borderRadius={1}
        bgcolor="#E4E8EF"
      >
        <Box
          width={`${percentage}%`}
          bgcolor={color}
          position="absolute"
          borderRadius={1}
          height="100%"
        ></Box>
      </Box>
    </>
  );
};

const PropertyReferrals = () => {
  return (
    <Box
      p={4}
      bgcolor="#FCFCFC"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#1142D">
        Property Referrals
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar) => {
          return <ProgressBar key={bar.title} {...bar} />;
        })}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
