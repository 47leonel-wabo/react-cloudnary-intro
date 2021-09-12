import axios from 'axios';
import { useState } from 'react';
import './App.css';
import {Image, Transformation} from 'cloudinary-react'

function App() {

  const [fileSelected, setFileSelected] = useState(null)
  const [uploadedImg, setUploadedImg] = useState({})

  const handleChange = (event) => {
    const file = event.target.files[0]
    // define form data
    const formData = new FormData()
    // fill it with data
    formData.append('file', file)
    formData.append('upload_preset', 'jnw99n6b')

    setFileSelected(formData)
  }

  const handleSubmit = (e) => {

    // send object to cloud using axios
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`, fileSelected)
    .then(response => {
      console.log(response.data);
      setUploadedImg({...uploadedImg, secure_url: response.data.secure_url, signature: response.data.signature, public_id: response.data.public_id})
    })
    .catch(error => {console.error(error);})
  }

  return (
    <div className="App">
      <input type='file' style={{backgroundColor: '#f5f5f5', padding: '16px', marginTop: '16px'}} onChange={handleChange} />
      <button onClick={handleSubmit}>Upload File</button>
      <div>
        <Image
          cloudName={`${process.env.REACT_APP_CLOUDINARY_CLOUD}`}
          publicId={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload/v1631446461/vlz8yxagjp5wcgl8k12l.png`}
        >
          <Transformation width='200' height='200' crop='thumb'/>
          </Image>
      </div>
      <div>
        <Image
          cloudName={`${process.env.REACT_APP_CLOUDINARY_CLOUD}`}
          publicId={uploadedImg.public_id}
        />
        <span>Image signature: {uploadedImg.signature}</span>
      </div>
    </div>
  );
}

export default App;
