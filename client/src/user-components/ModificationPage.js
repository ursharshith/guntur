import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../style.css"

function ModificationPage() {
    const [newWallet, setNewWallet] = useState(0);
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");
    const handleNewWallet = () => {
        axios.put(`https://project-wmxw.onrender.com/wallet/${email}`, {newWallet})
        .then((result) => {
          navigate("/home");
        })
        .catch(err => console.log(err));
    }
  return (
    <div className="walletdiv">
      <Card className="wallet-card">
          <TextField
          required
          fullWidth
          name="walletupdate"
          label="Enetr amount"
          type="number"
          id="walletupdate"
          onChange={(e) => setNewWallet(e.target.value)}
        />
        <CardContent>
          <Button type="text" onClick={handleNewWallet} variant="outlined">update-W</Button>
        </CardContent>
    </Card>
    </div>
  );
}

export default ModificationPage;
