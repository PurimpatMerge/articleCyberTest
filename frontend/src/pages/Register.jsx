import IconButton from '@mui/material/IconButton';
import { Image } from 'antd';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import bg from '../assets/bg-room.jpg'
import Navbar from '../components/home/Navbar';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';

const Register = () => {

    //   img
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
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full' />
            <Navbar />
            <div className="container mx-auto py-20">
                <div className="border border-gray-200 rounded-lg  shadow-lg p-10 text-center md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto backdrop-blur-sm bg-white/30">
                    <div>
                        <h1 className='text-3xl'>Register</h1>
                    </div>
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
                                <Image key={index} height={200} src={imageSrc} alt="profileimg" />
                            ))}
                        </div>
                    </div>
                    {/* info */}
                    <div className='grid grid-cols-2 gap-5 text-left'>
                        <div>
                            <TextField label="Username" variant="standard" />
                        </div>
                        <div>
                            <TextField label="Password" variant="standard" />
                        </div>
                        <div>
                            <TextField label="Firstname" variant="standard" />
                        </div>
                        <div>
                            <TextField label="Lastname" variant="standard" />
                        </div>
                        <div>
                            <TextField label="Email" variant="standard" />
                        </div>

                    </div>

                    {/* Button */}
                    <div className='my-5'>
                        <button className='rounded-full bg-gray-500 p-5 w-1/2 hover:scale-105 duration-100 text-white shadow-md'>Confirm</button>
                    </div>

                </div>
            </div>
            <div className='bottom-0 absolute left-1/2 -translate-x-1/2'>
                <p>&copy;2023 Purimpat</p>
            </div>
        </div>
    )
}
export default Register;