import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface UserCreationType {
  changeHandler: any;
  formData: any;
  submitHandler: any;
  authTypeChangeHandler: any;
}

const SignUp = (props: UserCreationType) => {
  const { changeHandler, formData, submitHandler, authTypeChangeHandler } =
    props;

  /**
   * @description A function to check if password and confirm password are same.
   * @function showPasswordError
   * @returns {Boolean} - return true if password and confirm password is same else false
   */
  const showPaaswordError = (): boolean => {
    if (
      formData["password"] !== "" &&
      formData["cPassword"] !== "" &&
      formData["password"] !== formData["cPassword"]
    )
      return true;
    return false;
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={changeHandler}
            value={formData["name"]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
            value={formData["email"]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
            value={formData["password"]}
          />
          <TextField
            error={showPaaswordError()}
            margin="normal"
            required
            fullWidth
            name="cPassword"
            label="Confirm Password"
            type="password"
            id="cPassword"
            autoComplete="current-password"
            onChange={changeHandler}
            value={formData["cPassword"]}
            helperText={
              showPaaswordError()
                ? "Password and confirm password must be same"
                : ""
            }
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitHandler}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link onClick={authTypeChangeHandler} variant="body2">
                {"I have an account, Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
