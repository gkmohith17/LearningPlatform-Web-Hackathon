import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../Styles/MiscStyles.css";
import Footer from "./Footer";
import NavBar from "./Navbar";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ setCurrentPage }: Props) => {
  var firebaseApp = initializeApp(firebaseConfig);

  var temp = firebaseApp;
  firebaseApp = temp;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentPage("home"); // Change the page to "home" after successful login
      }
    });

    return () => unsubscribe();
  }, [setCurrentPage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const auth = getAuth();
      const { email, password } = formData;

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Incorrect username or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleNoAccount = () => {
    setCurrentPage("login");
  };

  return (
    <>
      <NavBar
        setCurrentPage={setCurrentPage}
        navItems={[]}
        isLoggedIn={false}
      ></NavBar>
      <Box
        className="container"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={4}>
            <Box
              sx={{
                border: "3px solid #ff0000",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.4)",
                padding: "20px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  m: 3,
                  color: "#FF3311",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Faculty Log in
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <button
                    className="submit"
                    type="submit"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#FF3311", border: "none" }}
                  >
                    Login
                  </button>
                </Box>
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                )}
                <Box>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#FF3311 ",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "1.1em",
                    }}
                    onClick={handleNoAccount}
                  >
                    Click To Login As Student
                  </Typography>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
