import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SeparateDetails = () => {

    // const SeparateDetails = ({name, email, onAcceptReject}) => {
    //     const handleAccept = () => {
          
    //     }
    // }

    const [imageUrl, setImageUrl] = useState(null)

    const email = "mahipalkeluth143@gmail.com"

    useEffect(() => {
      axios.get(`https://project-wmxw.onrender.com/getImage/${email}`)
      .then((res) => setImageUrl(res.data.imageurl))
      .catch((err) => console.log(err));
    }, [])

    const link = `https://project-wmxw.onrender.com/uploads/${imageUrl}`

  return (
    <div>
      <h1>hello</h1>
      <img src={link} alt="images"/>
    </div>
  )
}

export default SeparateDetails