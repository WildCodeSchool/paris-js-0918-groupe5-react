import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CguNews from "./CguNews";


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  block1: {
    display: "flex",
    flexDirection: "column"
  },
  block2: {
    display: "flex",
    flexDirection: "column"
  }
});

const title = [
  {
    value: "Male",
    label: "Mr."
  },
  {
    value: "Female",
    label: "Mme"
  }
];

class ChampsCargivers extends React.Component {
  state = {
    title: " ",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    preferenceContact: "",
    password: "",
    showPassword: false,
    password2: "",
    captcha: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  };

  handleClickPassword2 = () => {
    this.setState(state => ({ Password2: !this.state.Password2 }));
  };

  handleClickPassword2 = () => {
    if (this.state.password2 !== this.state.password) {
      alert("please enter an identical password.");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="demo">
        <form
          onSubmit={this.handleClickPassword2}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <div className={classes.block1}>
            <TextField
              id="standard-select-title-native"
              select
              label="test"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange("title")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              {title.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="standard-name"
              label="Name*"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
            <TextField
              id="standard-firstname"
              label="First Name*"
              className={classes.textField}
              value={this.state.firstname}
              onChange={this.handleChange("firstname")}
              margin="normal"
            />
            <TextField
              id="standard-email"
              label="email*"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <TextField
              id="standard-phone"
              label="Phone*"
              className={classes.textField}
              value={this.state.phone}
              onChange={this.handleChange("phone")}
              margin="normal"
            />
          </div>
          <div className={classes.block2}>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password2}
                onChange={this.handleChange("password2")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <CguNews />
              {/*<TextField
                id="standard-phone"
                label="Captcha*"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                margin="normal"
              />*/}
             
            </FormControl>
            
          </div>

        </form>
       
      </div>
    );
  }
}

ChampsCargivers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChampsCargivers);
