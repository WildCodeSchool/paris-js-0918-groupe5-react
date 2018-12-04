import React from "react";
import Header from "./Header";
import NavBarReceiver from "./NavBarReceiver";
// import NavBarCareGiver from "./NavBarCareGiver";
import NavBarCareGiver1 from "./NavBarCareGiver1";
import Grid from "@material-ui/core/Grid";

const RemainingComponent = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <NavBarCareGiver1 />
        </Grid>

        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <NavBarReceiver />
        </Grid>

        {/* <Grid item xs={2}>
          <NavBarCareGiver />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default RemainingComponent;
