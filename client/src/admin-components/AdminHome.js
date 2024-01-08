import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import SeparateDetails from "./SeparateDetails";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const AdminHome = () => {
  const [mailsData, setMailsData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [studentDetails, setStudentDetails] = useState([])
  const [studentStudyDetails, setStudentStudyDetails] = useState([])
  const [studentInstitutionDetails, setStudentInstituionDetails] = useState([])
  const [studentResidenialDetails, setStudentResidentialDetails] = useState([])
  const [otherDetails, setOtherDetails] = useState([])
  const [studentResidentialDetails, setOtherResidentialDetails] = useState([])
  const [imageUrl, setImageUrl] = useState();

  //Student 10th details
  const [sscBoard, setSSCBoard] = useState("");
  const [sscType, setSSCType] = useState("");
  const [sscPassYear, setSSCPassYear] = useState("");
  const [sscHallTicket, setSSCHallTicket] = useState("");
  const [dob, setDOB] = useState("");

  //Student Details
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [file, setFile] = useState();
  localStorage.setItem("applcationMail", email);

  //Residential Adress Details
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  //Institutional Details
  const [districtInstitution, setDistrictInstitution] = useState("");
  const [mandalInstitution, setMandalInstitution] = useState("");
  const [institutionname, setInstitutionName] = useState("");
  const [coursename, setCourseName] = useState("");
  const [admissionnumber, setAdmissionNumber] = useState("");
  const [addressInstitution, setAddressInstitution] = useState("");

  const email1 = "mahipalkeluth143@gmail.com"
  console.log(email)

  useEffect(() => {
    axios
      .get("https://project-wmxw.onrender.com/application_mails")
      .then((res) => {
        setMailsData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleView = (user) => {

    setShowDetails(true)

    if (user.applicationType === "student") {
      axios.get(`https://project-wmxw.onrender.com/student-apply-personal-details/${user.email}`)
        // setStudentDetails(res.data)
        .then((res) => {
          setName(res.data.name)
          setFatherName(res.data.fatherName)
          setGender(res.data.gender)
          setAge(res.data.age)
          setMobileNo(res.data.mobileNo)
          setEmail(res.data.email)
          setAadhar(res.data.aadhar)
        })

        .catch((err) => console.log(err))

      axios.get(`https://project-wmxw.onrender.com/student-apply-study-details/${user.email}`)
        // setStudentStudyDetails(res.data)
        .then((res) => {
          setSSCType(res.data.sscType)
          setSSCBoard(res.data.sscBoard)
          setSSCPassYear(res.data.sscPassYear)
          setSSCHallTicket(res.data.sscHallTicket)
          setDOB(res.data.dob)
        })
        .catch((err) => console.log(err))

      axios.get(`https://project-wmxw.onrender.com/student-apply-insitution-details/${user.email}`)
        // setStudentInstituionDetails(res.data)
        .then((res) => {
          // setDistrictInstitution(res.data.)
          // setMandalInstitution(res.data.)
          // setInstitutionName(res.data.)
          // setCourseName(res.data.)
          // setAdmissionNumber(res.data.)
          // setAddressInstitution(res.data.)
        })
        .catch((err) => console.log(err))

      axios.get(`https://project-wmxw.onrender.com/student-apply-residential-details/${user.email}`)
        // setStudentResidentialDetails(res.data)
        .then((res) => {
          setDistrict(res.data.district)
          setMandal(res.data.mandal)
          setVillage(res.data.village)
          setAddress(res.data.address)
          setPostalCode(res.data.postalCode)
        })
        .catch((err) => console.log(err))

      axios.get(`https://project-wmxw.onrender.com/getImage/${user.email}`)
        .then((res) => setImageUrl(res.data.imageurl))
        .catch((err) => console.log(err));

    } if (user.applicationType === "other") {

    }
  };

  const link = `https://project-wmxw.onrender.com/uploads/${imageUrl}`
  // const [newStatus, setNewStatus] = useState("failed");
  // const [hello, setHello] = useState(true)

  // console.log(imageUrl)
  // console.log(link)

  // console.log(studentDetails)
  // console.log(studentStudyDetails)
  // console.log(studentResidenialDetails)
  // console.log(studentInstitutionDetails)
  // console.log(studentStudyDetails.data.sscBoard)

  const hello = (stat) => {
    if (stat === "failed" || stat === "success") {
      return false;
    } else {
      return true;
    }
  }

  const handleFail = () => {
    setShowDetails(false)
    // axios.delete(`https://project-wmxw.onrender.com/deleteApplication/${email}`)
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err))

    let newStatus = "failed";

    axios.put(`https://project-wmxw.onrender.com/statusUpdate/${email}`, { newStatus })
      .then((res) => { })
      .catch((err) => console.log(err))

    // axios.put(`https://project-wmxw.onrender.com/resendApplicationMoney/${email}`)
    // .then((res) => {})
    // .catch((err) => console.log(err))
  }

  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/qrgeneration")
    let newStatus = "success";
    axios.put(`https://project-wmxw.onrender.com/statusUpdate/${email}`, { newStatus })
      .then((res) => { })
      .catch((err) => console.log(err))
  }



  return (
    <div style={{ margin: "50px" }}>
      {!showDetails ? (
        <div>
          <h2>USER APPLICATIONS</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>
                    <strong>Sino</strong>
                  </TableCell> */}
                  <TableCell style={{ textAlign: "center" }}>
                    <strong>Application email</strong>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <strong>View Application</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mailsData && mailsData.length > 0 ? (
                  mailsData.map((data, index) => (
                    <TableRow key={index}>
                      {/* {hello(data.status) && (<TableCell>{index + 1}</TableCell>)} */}
                      {hello(data.status) && (<TableCell style={{ cursor: "pointer", textAlign: "center" }}>
                        {data.email}
                      </TableCell>)}
                      {hello(data.status) && (<TableCell
                        style={{
                          cursor: "pointer",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => handleView(data)}
                        >
                          View
                        </Button>
                      </TableCell>)}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (<div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "25px",
          margin: "20px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            marginTop: "10px",
            marginBottom: "40px",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          <spam>APPLICATION</spam>
        </Typography>
        <img src={file}></img>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, margin: "20px" }}>
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
          </div>
          <div style={{ flex: 1, margin: "20px" }}>
            <TableContainer component={Paper}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  marginLeft: "25%",
                  fontSize: "20px",
                }}
              >
                Residential Address Details
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
                    <TableCell>District</TableCell>
                    <TableCell>{district}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mandal</TableCell>
                    <TableCell>{mandal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Village</TableCell>
                    <TableCell>{village}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Postal Code</TableCell>
                    <TableCell>{postalCode}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, margin: "20px" }}>
            <TableContainer component={Paper}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  marginLeft: "25%",
                  fontSize: "20px",
                }}
              >
                Student Details
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
                    <TableCell>Name</TableCell>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Father/ Guardian Name</TableCell>
                    <TableCell>{fatherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>{dob}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>{gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Age</TableCell>
                    <TableCell>{age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Aadhar</TableCell>
                    <TableCell>{aadhar}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>{mobileNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ flex: 1, margin: "20px" }}>
            {/* <TableContainer component={Paper}>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                marginLeft: "25%",
                fontSize: "20px",
              }}
            >
              Profile Photo
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
                  <TableCell>District</TableCell>
                  <TableCell>{districtInstitution}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mandal</TableCell>
                  <TableCell>{mandalInstitution}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Institution Name</TableCell>
                  <TableCell>{institutionname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>{coursename}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Admission No</TableCell>
                  <TableCell>{admissionnumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{addressInstitution}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
            <Typography
              variant="h5"
              gutterBottom
              style={{
                // marginLeft: "25%",
                fontSize: "20px",
              }}
            >
              Profile Photo
            </Typography>
            <img src={link} style={{ height: "150px", width: "150px", textAlign: "center" }} alt="images" />
          </div>
        </div>
        <div style={{ margin: "auto" }}>

          <Button
            type="text"
            variant="contained"
            style={{ marginRight: "8px" }}
            color="success"
            onClick={handleSuccess}
          >
            Success
          </Button>
          <Button
            type="text"
            variant="contained"
            color="info"
            onClick={handleFail}
          >
            failed
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};
export default AdminHome;
