import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Label, Button } from "@adminjs/design-system";
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminJS, { useCurrentAdmin } from "adminjs";
import { isPasswordValid } from "../validations/validation.helper";
import axios from "axios";
import { requiredField } from "../styles";

const ChangePassword = () => {
  const adminJS = AdminJS as any;
  const API_URL = `${adminJS.env.APP_URL}/api/v1`;
  const [currentAdmin] = useCurrentAdmin();
  const auth_headers = {
    headers: {
      Authorization: "Bearer " + currentAdmin?.authorization_token
    }
  };

  const params = useParams();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [error_message, set_error_message] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [new_password_error, set_new_password_error] = useState("");
  const [confirm_password_error, set_confirm_password_error] = useState("");
  const [inputData, setInputData] = useState({
    new_password: "",
    confirm_password: ""
  });

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const resetPassword = (): void => {
    setInputData({
      new_password: "",
      confirm_password: ""
    });
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    if (event.key === "Enter" || event.keyCode === 13) {
      onPasswordChange();
    }
  };

  const onPasswordChange = (): any => {
    const { new_password, confirm_password } = inputData;

    if (new_password.length === 0 || !new_password) {
      set_new_password_error("New Password is required");
      setSuccessMessage(false);
      setTimeout(() => {
        set_new_password_error("");
      }, 2000);
      return null;
    }

    if (confirm_password.length === 0 || !confirm_password) {
      set_confirm_password_error("Confirm Password is required");
      setTimeout(() => {
        set_confirm_password_error("");
      }, 2000);
      return null;
    }

    if (new_password !== confirm_password) {
      set_error_message("New password and confirm password doesn't matched !!");
      setSuccessMessage(false);
      setTimeout(() => {
        set_error_message("");
      }, 2000);
      return null;
    }

    if (!isPasswordValid(new_password)) {
      set_new_password_error("Password is not valid, It contains 1 uppercase, 1 lowercase 1 number and 1 special character with min 8 characters");
      setSuccessMessage(false);
      setTimeout(() => {
        set_new_password_error("");
      }, 2000);
      return null;
    }

    axios.post(`${API_URL}/users/change-password/${params.recordId}`, inputData, auth_headers).then((response) => {
      if (response && response.data) {
        set_error_message("Password Changed Successfully !!!");
        setSuccessMessage(true);
        setTimeout(() => {
          resetPassword();
          goBack();
        }, 1000);
      } else {
        resetPassword();
      }
    });

    setTimeout(() => {
      set_error_message("");
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <Box boxShadow="card" variant="white">
      {error_message && (
        <Alert style={{ margin: "1rem 0" }} severity={successMessage ? "success" : "error"}>
          {error_message}
        </Alert>
      )}
      <Stack direction="column" spacing={2}>
        <FormControl>
          <Label style={{ color: new_password_error && "red" }}>
            <span style={new_password_error ? { color: "red" } : requiredField}>* </span> New Password <small>(must contains 1 uppercase, 1 lowercase 1 number and 1 special character with min 8 characters)</small>
          </Label>
          <OutlinedInput
            className="input_field"
            required
            type={showNewPassword ? "text" : "password"}
            value={inputData.new_password}
            onChange={(e) => setInputData({ ...inputData, new_password: e.target.value })}
            onKeyDown={onKeyPressHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowNewPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {new_password_error && <Alert severity="error">{new_password_error}</Alert>}
        </FormControl>
        <FormControl>
          <Label style={{ color: confirm_password_error && "red" }}>
            <span style={confirm_password_error ? { color: "red" } : requiredField}>* </span>Confirm Password
          </Label>
          <OutlinedInput
            className="input_field"
            required
            type={showConfirmPassword ? "text" : "password"}
            value={inputData.confirm_password}
            onChange={(e) => setInputData({ ...inputData, confirm_password: e.target.value })}
            onKeyDown={onKeyPressHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {confirm_password_error && <Alert severity="error">{confirm_password_error}</Alert>}
        </FormControl>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button type="button" variant="primary" onClick={onPasswordChange}>
            Save
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
