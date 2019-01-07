// import React from "react";
// import ReactDOM from "react-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import "./css/Captcha.css";

// const TEST_SITE_KEY = "6LcBNGgUAAAAAIj17J6UuVmX_kb7vo6AxMJYj07C";
// const DELAY = 1500;


// class Captcha extends React.Component {
//   constructor(props, ...args) {
//     super(props, ...args);
//     this.state = {
//       load: false,
//       expired: "false"
//     };
//     this._reCaptchaRef = React.createRef();
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ load: true });
//     }, DELAY);
//     console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
//   }

//   handleChange = value => {
//     console.log("Captcha value:", value);
//     this.setState({ value });
//   };

//   asyncScriptOnLoad = () => {
//     this.setState({ callback: "called!" });
//     console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
//   };
//   handleExpired = () => {
//     this.setState({ expired: "true" });
//   };
//   handleExpired2 = () => {
//     this.setState({ expired2: "true" });
//   };

//   render() {
//     const { load } = this.state || {};
//     return (
//       <div className="Captcha">
//         {load && (
//           <ReCAPTCHA
//             style={{ display: "inline-block", height:"100px" }}
//             theme="light"
//             ref={this._reCaptchaRef}
//             sitekey={TEST_SITE_KEY}
//             onChange={this.handleChange}
//             asyncScriptOnLoad={this.asyncScriptOnLoad}
//           />
//         )}
//       </div>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Captcha />, rootElement);

// export default Captcha;
