import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface UserAuthTypes {
  changeHandler: any;
  formData: any;
  submitHandler: any;
  authTypeChangeHandler: any;
  forgetPasswordHandler: any;
}
const UserAuth = (props: UserAuthTypes) => {
  const {
    changeHandler,
    formData,
    submitHandler,
    authTypeChangeHandler,
    forgetPasswordHandler,
  } = props;

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
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={forgetPasswordHandler} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={authTypeChangeHandler} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserAuth;
