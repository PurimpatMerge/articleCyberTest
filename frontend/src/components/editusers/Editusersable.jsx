import { Space, Table } from 'antd';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const Editusersable = () => {
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Image
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={handleOpen}>
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      lastname: 32,
      email: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      lastname: 42,
      email: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      lastname: 32,
      email: 'Sydney No. 1 Lake Park',
    },
  ];



  return (
    <div className="container mx-auto my-5">
      <Table columns={columns} dataSource={data} />


      {/* Edit content */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-5 bg-white w-1/2 inset-x-1/2 -translate-x-1/2 top-28 absolute ">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onImageChange} />
                <PhotoCamera />
              </IconButton>
              <label className=" text-blue-500">Upload Image</label>
              {imageURLs.map((imageSrc, index) => (
                <img key={index} height={100} src={imageSrc} alt="profileimg" />
              ))}
            </div>
            <div>
            </div>
            <div >
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
          <div className='flex justify-end gap-5'>
            <Button onClick={handleClose} variant="contained" >Cancle</Button>
            <Button variant="contained">Apply</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Editusersable;