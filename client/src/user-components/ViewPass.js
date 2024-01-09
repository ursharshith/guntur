import {
  Alert,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
  TableBody,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Pass from "./Pass";

function ViewPass() {
  const [viewMail, setViewMail] = useState("");
  const [status, setStatus] = useState("");
  const [viewStatusData, setViewStatusData] = useState([]);
  const [nameDetails, setNameDetails] = useState([]);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState();
  const [qr, setQr] = useState("");

  // Pass Details

  const [name, setName] = useState("");
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [futureDate, setFutureDate] = useState(null);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleView = () => {
    axios
      .get(`https://project-wmxw.onrender.com/getStatus/${viewMail}`)
      .then((res) => {
        setViewStatusData(res.data);
        setStatus(res.data.status);
        setQr(res.data.imgUrl);
        setFromPlace(res.data.fromplace);
        setToPlace(res.data.toplace);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://project-wmxw.onrender.com/getImage/${viewMail}`)
      .then((res) => setProfile(res.data.imageurl))
      .catch((err) => console.log(err));

    axios
      .get(`https://project-wmxw.onrender.com/getName/${viewMail}`)
      .then((res) => {
        setNameDetails(res.data);
        // setStatus(res.data.status);
        // setQr(res.data.imgUrl);
        setName(res.data.name);
        // console.log("my name :", res.data.name)
      })
      .catch((err) => console.log(err));

    // const newDate = new Date(currentDate);
    // newDate.setMonth(newDate.getMonth() + 6);
    // setFutureDate(newDate);

    //   console.log("current:", formatDate(currentDate))
    // console.log("future:", formatDate(futureDate))
  };

  // console.log(viewStatusData);
  // console.log("status", status);
  // console.log(profile);

  console.log("email :", viewMail);
  console.log("name :", name);
  console.log("start date :", startDate);
  console.log("end date :", endDate);
  console.log("from place :", fromPlace);
  console.log("to place :", toPlace);

  useEffect(() => {
    if (status === "pending") {
      setPending(true);
    } else if (status === "failed") {
      setFailed(true);
    } else if (status === "success") {
      setSuccess(true);
    }
  }, [status]);

  const link = `https://project-wmxw.onrender.com/uploads/${profile}`;

  return (
    <div style={{ backgroundColor: "#fff", margin: "50px", padding: "50px" }}>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontSize: "20px",
          marginTop: "10px",
          marginBottom: "40PX",
        }}
      >
        ENTER MAIL TO VIEW PASS
      </Typography>
      <TextField
        placeholder="enter mail"
        type="text"
        required
        onChange={(e) => setViewMail(e.target.value)}
        style={{ width: "50%", marginBottom: "20px" }}
      ></TextField>{" "}
      <br />
      <Button variant="contained" color="inherit" onClick={handleView}>
        VIEW
      </Button>
      {pending && (
        <div>
          <h4>YOUR APPLICATION STILL PENDING</h4>
        </div>
      )}
      {failed && (
        <div style={{ color: "red" }}>
          <h4>YOUR APPLICATION HAS REJECTED</h4>
          <h4>Please Re-apply</h4>
        </div>
      )}
      {success && (
        <div style={{ color: "green", backgroundColor: "#fff" }}>
          <h4>YOUR APPLICATION SUCCESS</h4>
          <br />
          <br />
          <div style={{backgroundColor:"#fff", margin:"auto 25%", border:"1px solid black"}}>
            <div style={{ padding: "20px" }}>
              <div style={{ width: "50%", float: "left", padding: "20px" }}>
                <img
                  src={link}
                  style={{
                    height: "150px",
                    width: "150px",
                    // textAlign: "end",
                  }}
                  alt="images"
                />
              </div>
              <div style={{ width: "50%", float: "left", padding: "20px" }}>
                <img  src={qr} style={{
                    height: "150px",
                    width: "150px",
                    // textAlign: "end",
                  }} alt="QR" />
              </div>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    // marginLeft: "25%",
                    fontSize: "20px",
                  }}
                >
                  <strong>BUSS PASS</strong>
                </Typography>
                <Table>
                  {/* <TableHead style={{ backgroundColor: "#f2f2f2" }}>
                      <TableRow>
                        <TableCell>
                          <strong>Name</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Value</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead> */}
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {/* {" "} */}
                        <TableCell>
                          <strong>Name</strong>{" "}
                        </TableCell>
                      </TableCell>
                      <TableCell>
                      <TableCell>
                        <strong>{name}</strong>
                      </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                      <TableCell>
                        <strong>Email</strong>
                      </TableCell>
                      </TableCell>
                      <TableCell>
                      <TableCell>
                        <strong>{viewMail}</strong>
                      </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {/* <TableRow> */}
                        <TableCell>
                          <strong>Form</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{fromPlace}</strong>
                        </TableCell>
                        {/* </TableRow> */}
                      </TableCell>
                      <TableCell>
                        {/* <TableRow> */}
                        <TableCell>
                          <strong>To</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{toPlace}</strong>
                        </TableCell>
                        {/* </TableRow> */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {/* <TableRow> */}
                        <TableCell>
                          <strong>Start Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{startDate}</strong>
                        </TableCell>
                        {/* </TableRow> */}
                      </TableCell>
                      <TableCell>
                        {/* <TableRow> */}
                        <TableCell>
                          <strong>End Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{endDate}</strong>
                        </TableCell>
                        {/* </TableRow> */}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// function Pass(props) {
//   const { viewMail } = props;
//   const [applyData, setApplyData] = useState([])
//   const [profile, setProfile] = useState()

//   useEffect(() => {

//       axios.get(`https://project-wmxw.onrender.com/getImage/${viewMail}`)
//           .then((res) => {
//               setProfile(res.data.imageurl)
//               console.log("Iam image", profile)
//           })
//           .catch((err) => console.log(err));
//       axios
//           .get("https://project-wmxw.onrender.com/application_mails")
//           .then((res) => {
//               setApplyData(res.data);
//               console.log("I am apply data",applyData);
//           })
//           .catch((err) => console.log(err));
//   }, [])

//   return (
//       <div >
//             hello
//       </div>
//   );
// }

export default ViewPass;
