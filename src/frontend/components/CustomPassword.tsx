import React, { useState, FC, ReactElement } from "react";
import { Box, Button, FormGroup, Icon, Input, InputGroup, Label } from "@adminjs/design-system";
import { isPasswordValid } from "../validations/validation.helper";
import { margin, requiredField } from "../styles";
import { ShowPropertyProps } from "adminjs";

const CustomPassword: FC<ShowPropertyProps> = (props): ReactElement => {
  const { property, record } = props;
  const error = record.errors && record.errors[property.path];
  const [showPassword, setShowPassword] = useState(false);
  const [variant, setVariant] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClickShowPassword = (): any => {
    setShowPassword((show) => !show);
    setVariant((variant) => !variant);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    record.params.password = e.target.value;
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isPasswordValid(record.params && record.params.password)) {
      setPasswordError("Password is not valid, It contains 1 uppercase, 1 lowercase 1 number and 1 special character with min 8 characters");
    } else {
      setPasswordError("");
    }
  };

  return (
    <Box style={margin(0, 0, 2, 0, "rem")}>
      <FormGroup error={Boolean(error)}>
        <Label>
          <span style={error ? { color: "red" } : requiredField}>* </span> {property.label} <small>(must contains 1 uppercase, 1 lowercase, 1 number and 1 special character with min 8 characters)</small>
        </Label>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} onChange={changeHandler} value={password} onBlur={handleInputBlur} />
          <Button type="button" variant={variant ? "primary" : ""} style={{ cursor: "pointer" }} size="icon">
            <Icon onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} icon="View" color="blue" />
          </Button>
        </InputGroup>
      </FormGroup>
      <Label style={{ color: "red", marginButton: "1rem" }}>{error?.message ? error.message : passwordError}</Label>
    </Box>
  );
};

export default CustomPassword;
