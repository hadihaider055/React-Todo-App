import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "./style.css";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

interface ModalTypes {
  FormName: String;
}

export default function LoginModal({ FormName }: ModalTypes) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userHistory, setUserHistory] = useState<Object[]>([]);
  const [getUserHistory, setGetUserHistory] = useState<Object[]>(
    JSON.parse(localStorage.getItem("userHistory") || "[]")
  );
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (user.email !== "" && user.password !== "") {
      setUserHistory([...getUserHistory, user]);
    }
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (FormName === "Sign up") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userHistory", JSON.stringify(userHistory));
      setUser({
        email: "",
        password: "",
      });
      setError("");
      handleClose();
      window.location.reload();
    } else if (FormName === "Login") {
      getUserHistory.map((item: any) => {
        if (user.email === item.email) {
          if (user.password === item.password) {
            localStorage.setItem("user", JSON.stringify(item));
            handleClose();
            setUser({
              email: "",
              password: "",
            });
            window.location.reload();
          } else {
            setError("Invalid Credentials!");
          }
        } else {
          setError("User does not Exist!");
        }
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="btn btn-info">
        {FormName}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal">
              <div className="modal__header">
                <h1>{FormName}</h1>
              </div>
              {error && <Alert severity="error">{error}</Alert>}
              <div className="modal__body">
                <form onSubmit={handleSubmit}>
                  <label>
                    <Person className="material__icon" />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      onChange={handleChange}
                      value={user.email}
                    />
                  </label>
                  <label>
                    <Lock className="material__icon" />
                    {showPassword ? (
                      <>
                        <input
                          type="text"
                          placeholder="Password"
                          required
                          name="password"
                          onChange={handleChange}
                          value={user.password}
                        />
                        <Visibility
                          onClick={handleChangeVisibility}
                          className="visibility__icon"
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          name="password"
                          onChange={handleChange}
                          value={user.password}
                        />
                        <VisibilityOff
                          onClick={handleChangeVisibility}
                          className="visibility__icon"
                        />
                      </>
                    )}
                  </label>
                  <button className="material__btn">{FormName}</button>
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
