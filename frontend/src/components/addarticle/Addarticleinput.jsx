import Divider from '@mui/material/Divider';
import { Image } from 'antd';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import axios from "axios";

const Addarticleinput = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState({});
  
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

const allInfo={
...info,
images
}
  const handleSubmit = async () => {
    try {
      console.log(allInfo);
      const userid = localStorage.getItem('userid');
      console.log(userid);
  
      const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
  
      await axios.post(`http://localhost:8000/v1/api/article/createArticle/${userid}`, allInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token in the request headers
        }
      });
  
    } catch (err) {
      console.log("You're not logged in.");
    }
  };
  

  return (
    <div className="container mx-auto my-10 bg-white p-5 rounded-sm shadow-xl">
      {/* Header */}
      <div>
        <p className='text-4xl'>Creat Your Article</p>
      </div>
      <Divider />
      {/* Upload Image*/}
      <div className='flex flex-col'>
        <div>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={onImageChange} multiple />
            <PhotoCamera />
          </IconButton>
          <label className="text-blue-500">Upload Image</label>
        </div>
        <div>
          {imageURLs.map((imageSrc, index) => (
            <Image key={index} height={400} src={imageSrc} alt="profileimg" />
          ))}
        </div>
      </div>
      {/* add Header */}
      <div className='my-1'>
        <p>Title</p>
        <TextField variant="outlined" className='w-full' id="title"   onChange={handleChange} />
      </div>
      <Divider />
      {/* add content */}
      <div className='my-1'>
        <p>CONTENT</p>
        <TextareaAutosize className='w-full border py-5 border-gray-200 rounded-md' label="Header" variant="standard" id="content"  onChange={handleChange} />
      </div>
      {/* add author */}
      <div className='my-1'>
        <p>AUTHOR</p>
        <TextField variant="outlined" className='w-full' id="author"  onChange={handleChange} />
      </div>
      {/* add category */}
      <div className='my-1'>
        <p>CATEGORY</p>
        <TextField variant="outlined" className='w-full' id="category"   onChange={handleChange} />
      </div>
      {/* add tags */}
      <div className='my-1'>
        <p>TAGS (comma-separated)</p>
        <TextField variant="outlined" className='w-full' id="tags" onChange={handleChange} />

      </div>
      {/* button */}
      <div className='flex justify-end'>
        <Button variant="contained" onClick={handleSubmit}>Apply</Button>
      </div>
    </div>
  );
};

export default Addarticleinput;
