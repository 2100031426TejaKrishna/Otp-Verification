import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const styles = {
    container: {
      backgroundColor: "#10b981",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    formContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "1rem",
    },
    title: {
      textAlign: "center",
      color: "black",
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    label: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.75rem",
      backgroundColor: "#059669",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    spinner: {
      marginTop: "0.25rem",
    },
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section style={styles.container}>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div style={styles.formContainer}>
            <h1 style={styles.title}>
              Welcome to <br />   OTP Generator
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" style={styles.label}>
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className={styles.input}
                />
                <button
                  onClick={onOTPVerify}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading && (
                    <CgSpinner size={20} style={styles.spinner} />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" style={styles.label}>
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading && (
                    <CgSpinner size={20} style={styles.spinner} />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
