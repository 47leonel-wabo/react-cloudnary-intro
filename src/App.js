import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {

  const [fileSelected, setFileSelected] = useState(null)

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
    axios.post('https://api.cloudinary.com/v1_1/stelle-style/image/upload', fileSelected)
    .then(response => {
      console.log(response);
    })
    .catch(error => {console.error(error);})
  }

  return (
    <div className="App">
      <input type='file' style={{backgroundColor: '#f5f5f5', padding: '16px', marginTop: '16px'}} onChange={handleChange} />
      <button onClick={handleSubmit}>Upload File</button>
    </div>
  );
}

export default App;
