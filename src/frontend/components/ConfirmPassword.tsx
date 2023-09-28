import React, { FC, ReactElement } from "react";
import { Box, Input } from "@adminjs/design-system";

const ConfirmPassword: FC = (): ReactElement => {
  return (
    <Box>
      <Input required />
    </Box>
  );
};
export default ConfirmPassword;
