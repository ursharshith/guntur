import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Bus from "../images/bus-1.jpg";
import Student from "../images/student1.jpg";
import Employee from "../images/employee2.jpg";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import "../style.css";

const HomeContent = React.forwardRef((props, ref) => {
  const divThreeRef = useRef(null);

  const guideFunction = () => {
    if (divThreeRef.current) {
      divThreeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useImperativeHandle(ref, () => ({
    guideFunction,
  }));

  const divStyle = {
    backgroundImage: `url(${Bus})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    textAlign: "center",
    padding: "160px 50px",
    fontSize: "50px",
    color: "#ffff",
    marginTop: "0",
    marginButtom: "0",
    paddingButtom: "0",
  };

  return (
    <div>
      <div style={divStyle}>
        <h1>T S R T C</h1>
      </div>
      <div className="cards-div">
        <div ref={divThreeRef} className="sub-cards-div1">
          <MultiActionAreaCard />
        </div>
        <div className="sub-cards-div2">
          <MultiActionAreaCard1 />
        </div>
      </div>

      <div className="copyright-div">
        <p style={{ display: "inline-block", padding: "7px 15px" }}>
          Copyright © 2023 Copyright - Team WE. All rights reserved.
        </p>
        <ControlledOpenSpeedDial />
      </div>
    </div>
  );
});

function MultiActionAreaCard() {
  const isUserLoggedin = localStorage.getItem("userSignIn");
  const navigate = useNavigate();
  const handleStudent = () => {
    if (isUserLoggedin === true) {
      navigate("/student/high-school");
    }
  };
  return (
    <Card sx={{ maxWidth: 345, height: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Student}
          alt="green iguana"
          onClick={handleStudent}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            STUDENTS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Students of any schools and colleges are appicable to apply the pass
            here.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function MultiActionAreaCard1() {
  const isUserLoggedin = localStorage.getItem("userSignIn");
  const navigate = useNavigate();
  const handleOther = () => {
    if (isUserLoggedin === true) {
      navigate("/other/apply");
    }
  };
  return (
    <Card sx={{ maxWidth: 345, height: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Employee}
          alt="green iguana"
          onClick={handleOther}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            OTHERS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Other than any students are appicable here. <br /> (Ex: Employees,
            workers etc..)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const actions = [
  { icon: <EmailIcon />, name: "mail" },
  { icon: <HelpIcon />, name: "help/guide" },
];

function ControlledOpenSpeedDial() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleMail = () => {
    navigate("/send-mail");
  };

  const handleHelp = () => {
    navigate("/help");
  };

  return (
    <Box sx={{ height: 12, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          key="mail"
          icon={<EmailIcon />}
          tooltipTitle="mail"
          onClick={handleMail}
        />
        <SpeedDialAction
          key="help/guide"
          icon={<HelpIcon />}
          tooltipTitle="help/guide"
          onClick={handleHelp}
        />
      </SpeedDial>
    </Box>
  );
}

export default HomeContent;
