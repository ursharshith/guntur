// import React, { useState } from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import QRcode from "qrcode"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const QrGenerationPage = () => {
//     const [url, setUrl] = useState('')
//     const [qrUrl, setQrUrl] = useState('')
//     const navigate = useNavigate()

//     const [startDate, setStartDate] = useState(null)
//     const [endDate, setEndDate] = useState(null)
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [futureDate, setFutureDate] = useState(null);

//     const formatDate = (date) => {
//         const options = { month: 'long', day: 'numeric', year: 'numeric' };
//         return date.toLocaleDateString(undefined, options);
//     };

//     const handleGenerate = async () => {
//         try {
//             const response = await QRcode.toDataURL(url)
//             setQrUrl(response)
//             const newDate = new Date(currentDate);
//             newDate.setMonth(newDate.getMonth() + 6);
//             setFutureDate(newDate);
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const email = localStorage.getItem("applcationMail");
//     const passUrl = `https://passverifier.netlify.app/login`;
//     console.log(passUrl)
//     console.log(qrUrl)



//     const handleDone = () => {
//         navigate("/admin-portal")
//         axios.put(`http://localhost:8080/qrUrlUpdate/${email}`, { qrUrl })
//             .then((res) => { })
//             .catch((err) => console.log(err))


//     }

//     console.log(localStorage.getItem("applcationMail"))








//     console.log("current:", formatDate(currentDate))
//     console.log("future:", formatDate(futureDate))

//     return (
//         <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
//             <Typography
//                 variant="h5"
//                 gutterBottom
//                 style={{

//                     fontSize: "20px",
//                     padding: "30px 0"
//                 }}
//             >
//                 QR GENERATION
//             </Typography>
//             <label style={{ marginBottom: "0px" }}>{passUrl} </label><br />
//             <TextField placeholder="paste url link" onChange={(e) => setUrl(e.target.value)} style={{ marginTop: "30px", marginBottom: "20px" }}></TextField> <br />
//             <Button variant="contained" color="info" onClick={handleGenerate}>Genterte</Button> <br /><br />
//             {qrUrl ? (
//                 <div>
//                     <a href={qrUrl} download><img src={qrUrl} alt="QR" /></a> <br />
//                     <Button style={{ marginBottom: "30px" }} variant="contained" color="success" onClick={handleDone}>Done</Button>
//                 </div>
//             ) : null}
//         </div>
//     )
// }

// export default QrGenerationPage;

import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import QRcode from "qrcode"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QrGenerationPage = () => {
    const [url, setUrl] = useState('')
    const [qrUrl, setQrUrl] = useState('')
    const navigate = useNavigate()

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [futureDate, setFutureDate] = useState(null);

    const formatDate = (date) => {
        if (!date) return '';
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleGenerate = async () => {
        try {
            const response = await QRcode.toDataURL(url)
            setQrUrl(response);
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 6);
            setFutureDate(newDate);
            setStartDate(formatDate(currentDate))
            setEndDate(formatDate(futureDate))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setStartDate(formatDate(currentDate))
    }, [currentDate])

    useEffect(() => {
        setEndDate(formatDate(futureDate))
    }, [futureDate])

    const email = localStorage.getItem("applcationMail");
    const passUrl = `https://passverifier.netlify.app/login`;
    console.log(email)
    console.log(passUrl)
    console.log(qrUrl)

    console.log("current:", formatDate(currentDate))
    console.log("future:", formatDate(futureDate))
    console.log("Start date:", startDate)
    console.log("End date:", endDate)

    const handleDone = () => {
        
        axios.put(`http://localhost:8080/qrUrlUpdate/${email}`, { qrUrl })
            .then((res) => { })
            .catch((err) => console.log(err))

        axios.put(`http://localhost:8080/dateUpdate/${email}`, { startDate, endDate })
            .then((res) => { })
            .catch((err) => console.log(err))
        navigate("/admin-portal")
    }

    console.log(localStorage.getItem("applcationMail"))

    console.log("current:", formatDate(currentDate))
    console.log("future:", formatDate(futureDate))
    console.log("Start date:", startDate)
    console.log("End date:", endDate)

    return (
        <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
            <Typography
                variant="h5"
                gutterBottom
                style={{
                    fontSize: "20px",
                    padding: "30px 0"
                }}
            >
                QR GENERATION
            </Typography>
            <label style={{ marginBottom: "0px" }}>{passUrl} </label><br />
            <TextField placeholder="paste url link" onChange={(e) => setUrl(e.target.value)} style={{ marginTop: "30px", marginBottom: "20px" }}></TextField> <br />
            <Button variant="contained" color="info" onClick={handleGenerate}>Generate</Button> <br /><br />
            {qrUrl ? (
                <div>
                    <a href={qrUrl} download><img src={qrUrl} alt="QR" /></a> <br />
                    <Button style={{ marginBottom: "30px" }} variant="contained" color="success" onClick={handleDone}>Done</Button>
                </div>
            ) : null}
        </div>
    )
}

export default QrGenerationPage;
