import Divider from '@mui/material/Divider';
import { Image } from 'antd';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
const Addarticleinput = () => {
    const [imageURLs, setImageURLs] = useState([]);
    const [images, setImages] = useState("");

    useEffect(() => {
        if (images?.length < 1) return;
        const newImageUrls = [];
        images?.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);


    const onImageChange = (e) => {
        setImages([...e.target.files]);
    };
    return (
        <div className="container mx-auto my-10 bg-white p-5 rounded-sm shadow-xl">
            {/* Header */}
            <div >
                <p className='text-4xl'>Add Article</p>
            </div>
            <Divider />
            {/* Upload Image*/}
            <div className='flex flex-col'>
                <div>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={onImageChange} />
                        <PhotoCamera />
                    </IconButton>
                    <label className=" text-blue-500">Upload Image</label>
                </div>
                <div>
                    {imageURLs.map((imageSrc, index) => (
                        <Image key={index} height={400} src={imageSrc} alt="profileimg" />
                    ))}
                </div>
            </div>
            {/* add Header */}
            <div className='my-1 '>
                <p>HEADER</p>
                <TextField  variant="outlined"  className='w-full'/>
            </div>
            <Divider />
            {/* add content */}
            <div className='my-1'>
                <p>CONTENT</p>
                <TextareaAutosize  className=' w-full  border py-5 border-gray-200 rounded-md' label="Header" variant="standard" />
            </div>
            {/* button */}
            <div className='flex justify-end'>
                <Button variant="contained">Apply</Button>
            </div>
        </div>
    )
}

export default Addarticleinput;