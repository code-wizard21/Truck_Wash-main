import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "../../../hooks/useScriptRef";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { jwtDecode } from "jwt-decode";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import axios from "axios";
import Http from "../../../utils/http";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

 


  const dispatch = useDispatch();

  const onSubmit = () => {
    Http.post("/api/auth/sigin", { Email: email, Password: pass })
      .then((data) => {
        const token = data.data.token;
        localStorage.setItem("authToken", token);
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
        const decodedToken = jwtDecode(token);
        dispatch({ type: "LOGIN_REQUEST", payload: decodedToken });
        if (decodedToken.job == "customer") {
          navigate("/client/checktask");
        } else if (decodedToken.job == "washer") {
          navigate("/washer/checktask");
        } else if (decodedToken.job == "driver") {
          navigate("/driver/checktask");
        } else if (decodedToken.job == "admin") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
    
        // handleClick({ vertical: 'top', horizontal: 'right' })
        // alert('The Input value is invaild');
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}

        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
        }) => (
          <>
            <FormControl
              fullWidth
              sx={{ ...theme.typography.customInput }}
              margin="normal"
            >
              <InputLabel
                style={{ marginBottom: "10px" }}
                htmlFor="outlined-adornment-email-login"
                required
              >
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                style={{ marginBottom: "10px" }}
                value={email}
                name="email"
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address / Username"
                inputProps={{}}
              />
            </FormControl>

            <FormControl
              fullWidth
              sx={{ ...theme.typography.customInput }}
              margin="normal"
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={pass}
                name="password"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e) => setPass(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={onSubmit}
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </>
        )}
      </Formik>

    </>
  );
};

export default FirebaseLogin;
