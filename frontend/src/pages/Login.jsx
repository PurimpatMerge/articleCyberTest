import React from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import bg from '../assets/bg-room.jpg'
import Navbar from '../components/home/Navbar';
import { Link } from 'react-router-dom';
Link
const Login = () => {

    // Show Password?
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full'/>
            <Navbar/>
            <div className="container mx-auto py-20">
                <div className="border border-gray-200 rounded-lg  shadow-lg p-10 text-center md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto backdrop-blur-sm bg-white/30">
                    <div>
                        <h1 className='text-3xl'>LOGIN</h1>
                    </div>
                    <div className='flex flex-col'>
                        {/* Username */}
                        <TextField label="Username" variant="standard" />
                        {/* Password */}
                        <FormControl  variant="standard">
                            <InputLabel>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    {/* Button */}
                    <div className='my-5'>
                        <button className='rounded-full bg-gray-500 p-5 w-1/2 hover:scale-105 duration-100 text-white shadow-md'>Login</button>
                    </div>
                    {/* Reister */}
                    <div>
                        
                        <Link to="/register"  className='hover:text-indigo-400 mx-5'>Register</Link>
    
                    </div>
                </div>
            </div>
            <div className='bottom-0 absolute left-1/2 -translate-x-1/2'>
                <p>&copy;2023 Purimpat</p>
            </div>
        </div>
    )
}
export default Login;