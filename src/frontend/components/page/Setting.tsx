import React, { useState, useEffect, FC, ReactElement } from "react";
import { Box, Button, H6, Input, Label } from "@adminjs/design-system";
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminJS, { useCurrentAdmin } from "adminjs";
import axios from "axios";
import { margin, requiredField } from "../../styles";
import { isPasswordValid } from "../../validations/validation.helper";

const Setting: FC = (): ReactElement => {
  const adminJS = AdminJS as any;
  const API_URL = `${adminJS.env.APP_URL}/api/v1`;
  const [currentAdmin] = useCurrentAdmin();
  const admin_id = currentAdmin?.id;
  const auth_header = { headers: { Authorization: "Bearer " + currentAdmin?.authorization_token } };
  const [inputData, setInputData] = useState({ new_password: "", confirm_password: "" });

  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [twoFAToken, setTwoFAToken] = useState("");
  const [userTwoFAStatus, setUserTwoFAStatus] = useState("");
  const [response_message, set_response_message] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [disable2FABtn, setDisable2FABtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [changePasswordBtn, setChangePasswordBtn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error_message, set_error_message] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [new_password_error, set_new_password_error] = useState("");
  const [confirm_password_error, set_confirm_password_error] = useState("");

  useEffect((): void => {
    axios.get(`${API_URL}/two-fa/${admin_id}`, auth_header).then(({ data }) => {
      setUserTwoFAStatus(data.data);
    });
  }, []);

  const disable_user_two_fa = async () => {
    return await axios.patch(`${API_URL}/two-fa/disable`, { userId: admin_id }, auth_header);
  };

  const refreshPage = (message: string, status: boolean): void => {
    setTimeout((): void => {
      window.location.reload();
    }, 2000);

    set_response_message(message);
    setAlertStatus(status);
  };

  const resetPassword = (): void => {
    setInputData({ new_password: "", confirm_password: "" });
  };
  const disableTwoFA = async (): Promise<void> => {
    const { data } = await disable_user_two_fa();
    if (data.success) {
      const message = "Successfully disable 2FA (but now your account is not secure by 2FA) !!";
      refreshPage(message, false);
    }
  };

  const enableTwoFAHandler = async (): Promise<void> => {
    const { data } = await axios.post(`${API_URL}/two-fa/setup`, { userId: admin_id }, auth_header);

    setImageUrl(data.data.qr_code_url);
    setUserId(data.data.userId);
    setQrCode(true);
    setDisable2FABtn(true);
    setChangePasswordBtn(false);
    setChangePassword(false);
  };

  const onChangePassword = (): void => {
    setChangePassword(true);
    setChangePasswordBtn(true);
    setDisable2FABtn(false);
    setQrCode(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTwoFAToken(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    if (event.key === "Enter" || event.keyCode === 13) {
      onVerifyTwoFAHandler();
    }
  };

  const onVerifyTwoFAHandler = async (): Promise<void> => {
    try {
      const { data } = await axios.patch(`${API_URL}/two-fa/enable`, { userId: userId, twoFAToken }, auth_header);
      if (data.data.status) {
        const message = "Your account is Verified !!";
        refreshPage(message, true);
      }
    } catch (err) {
      setErrorMessage("The given token is invalid.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const handlePasswordKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
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

    axios
      .patch(`${API_URL}/users/change-password/${admin_id}`, inputData, auth_header)
      .then((response) => {
        if (response && response.data) {
          const message = "Password Changed Successfully !!!";
          refreshPage(message, true);
        } else {
          resetPassword();
        }
      })
      .catch((err) => {
        set_error_message(`${err.response.data.message}`);
        setSuccessMessage(false);
        setTimeout(() => {
          set_error_message("");
        }, 2000);
      });

    setTimeout(() => {
      set_error_message("");
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <Box className="box_container" boxShadow="card" variant="white">
      {response_message && (
        <Alert style={{ margin: "1rem 0" }} severity={alertStatus ? "success" : "error"}>
          {response_message}
        </Alert>
      )}
      <Box style={margin(0, 0, 2, 0, "rem")}>
        {userTwoFAStatus ? (
          <Button variant="danger" onClick={disableTwoFA}>
            Disable 2FA
          </Button>
        ) : (
          <Button variant="success" onClick={enableTwoFAHandler} disabled={disable2FABtn}>
            Enable 2FA
          </Button>
        )}
        <Button style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={onChangePassword} variant="success" disabled={changePasswordBtn}>
          Change Password
        </Button>
      </Box>
      {qrCode && (
        <Box className="center_box">
          <img src={imageUrl} alt="Qr_code" className="qrCode_image" />
          <Box className="twoFa_verify_data">
            {errorMessage && (
              <Alert style={{ margin: "1rem 0" }} severity="error">
                {errorMessage}
              </Alert>
            )}
            <H6>Authorization Token</H6>
            <Input type="text" onKeyDown={handleKeyPress} onChange={inputChangeHandler} value={twoFAToken} />
          </Box>
          <Button onClick={onVerifyTwoFAHandler} variant="primary">
            Verify
          </Button>
        </Box>
      )}
      {changePassword && (
        <Box>
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
                onKeyDown={handlePasswordKeyPress}
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
                onKeyDown={handlePasswordKeyPress}
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
      )}
    </Box>
  );
};

export default Setting;
