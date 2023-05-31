import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from '../../assets/bg-room.jpg'
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
const ShowArticle = () => {
    return (
        <div>
            {/* Search and Add */}
            <div className="container mx-auto">
                <div className='flex'>
                    <div>
                        <TextField
                            className=' backdrop-blur-lg bg-white/30'
                            placeholder="Search By ..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className='mx-5 my-auto'>
                        <Link to='/addarticle'>
                            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
                                Add
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Article content */}
                <div className='mt-10 grid gap-5 grid-cols-none sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    <div>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={img}
                                title="articleimg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    หัวข้อ
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit esse quam eaque molestiae ab eligendi harum cum est molestias pariatur.
                                </Typography>
                            </CardContent>
                            <CardContent className='flex'>
                                <Avatar alt="avatar" src={img} />
                                <div className='my-auto'>
                                    <Typography variant="body2" color="text.secondary" >
                                        ชื่อ Lorem ipsum dolor sit amet.
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardContent className='flex justify-end'>
                                <Typography variant="body2" color="text.secondary"  >
                                    11/02/2566
                                </Typography>
                            </CardContent>
                            <CardActions className='flex justify-center'>
                                <Link to='/ArticleContent'>
                                    <Button size="small">Read More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </div>
                </div>

                {/* Pagination */}
                <div className='mt-10 flex justify-center'>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
            </div>
            <div className='bottom-0 absolute left-1/2 -translate-x-1/2'>
                <p>&copy;2023 Purimpat</p>
            </div>
        </div>
    )
}

export default ShowArticle;