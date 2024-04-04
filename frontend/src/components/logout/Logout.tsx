import { Button, Grid, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        width: { xs: "100%", md: "35%" },
        height: "30vh",
        margin: { xs: "0", md: "auto", lg: "auto" },
        transform: "translate(0,80%)",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{
          height: "100%",
          width: "100%",
          padding: { xs: "8px", md: "26px", lg: "32px" },
        }}
      >
        <Grid container item xs direction="row" justifyContent="center">
          <h2>Opps</h2>
        </Grid>
        <Grid container item xs={6} direction="row" justifyContent="center">
          <h3>
            You have been loged out from the application, Please click Login
            button to login
          </h3>
        </Grid>
        <Grid container item xs direction={"row"} justifyContent={"center"}>
          <Button
            size="small"
            color="success"
            variant="outlined"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Logout;
