import { Alert, Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField,Paper, Typography, TableBody } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Pass from "./Pass";

function ViewPass() {

  const [viewMail, setViewMail] = useState("");
  const [status, setStatus] = useState("");
  const [viewStatusData, setViewStatusData] = useState([])
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false)
  const [profile, setProfile] = useState()
  const [qr, setQr] = useState('')

  // Pass Details

  const [fname, setFirst] = useState('');
  const [lname, setLname] = useState('');
  const [fromPlace, setFromPlace] = useState('');
  const [months, setMonths] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [futureDate, setFutureDate] = useState(null);



  
      const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      };

  

  const handleView = () => {
    axios.get(`http://localhost:8080/getStatus/${viewMail}`)
      .then((res) => {
        setViewStatusData(res.data)
        setStatus(res.data.status)
        setQr(res.data.imgUrl)
      })
      .catch((err) => console.log(err))

    axios.get(`http://localhost:8080/getImage/${viewMail}`)
      .then((res) => setProfile(res.data.imageurl))
      .catch((err) => console.log(err));

      // const newDate = new Date(currentDate);
      // newDate.setMonth(newDate.getMonth() + 6);
      // setFutureDate(newDate);
  
    //   console.log("current:", formatDate(currentDate))
    // console.log("future:", formatDate(futureDate))
  }

  console.log(viewStatusData)
  console.log("status", status)
  console.log(profile)

  useEffect(() => {
    if (status === "pending") {
      setPending(true)
    }
    else if (status === "failed") {
      setFailed(true)
    } else if (status === "success") {
      setSuccess(true)
    }
  }, [status])

  const link = `http://localhost:8080/uploads/${profile}`


  return (
    <div style={{ backgroundColor: "#fff", margin: "50px", padding: "50px" }}>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontSize: "20px",
          marginTop: "10px",
          marginBottom: "40PX"
        }}
      >
        ENTER MAIL TO VIEW PASS
      </Typography>
      <TextField placeholder="enter mail" type="text" required onChange={(e) => setViewMail(e.target.value)} style={{ width: "50%", marginBottom: "20px" }}></TextField> <br />
      <Button variant="contained" color="inherit" onClick={handleView}>VIEW</Button>

      {
        pending && (
          <div>
            <h4>YOUR APPLICATION STILL PENDING</h4>
          </div>
        )
      }

      {
        failed && (
          <div style={{ color: "red" }}>
            <h4>YOUR APPLICATION HAS REJECTED</h4>
            <h4>Please Re-apply</h4>
          </div>
        )
      }

      {
        success && (
          <div style={{ color: "green" }}>
            <h4>YOUR APPLICATION SUCCESS</h4>
            <br /><br />
            <div>
              <div style={{ padding: "20px" }}>
                <div style={{ width: "50%", float: "left", padding: "20px" }}>
                  <img src={link} style={{ height: "150px", width: "150px", textAlign: "center" }} alt="images" />
                </div>
                <div style={{ width: "50%", float: "left", padding: "20px" }}>
                  <img src={qr} alt="QR" />
                </div>
              </div>
              {/* <div>
                <TableContainer component={Paper}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                      marginLeft: "25%",
                      fontSize: "20px",
                    }}
                  >
                    Student Education Details
                  </Typography>
                  <Table>
                    <TableHead style={{ backgroundColor: "#f2f2f2" }}>
                      <TableRow>
                        <TableCell>
                          <strong>Name</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Value</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>SSC Board</TableCell>
                        <TableCell>{sscBoard}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SSC(Regular/ Supplimentary)</TableCell>
                        <TableCell>{sscType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SSC Pass Year</TableCell>
                        <TableCell>{sscPassYear}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>SSC Hall Ticket</TableCell>
                        <TableCell>{sscHallTicket}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>{dob}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div> */}
            </div>
          </div>
        )
      }

    </div>
  );
}


// function Pass(props) {
//   const { viewMail } = props;
//   const [applyData, setApplyData] = useState([])
//   const [profile, setProfile] = useState()

//   useEffect(() => {

//       axios.get(`http://localhost:8080/getImage/${viewMail}`)
//           .then((res) => {
//               setProfile(res.data.imageurl)
//               console.log("Iam image", profile)
//           })
//           .catch((err) => console.log(err));
//       axios
//           .get("http://localhost:8080/application_mails")
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
