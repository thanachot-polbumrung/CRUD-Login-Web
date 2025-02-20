import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  CircularProgress,
  Stack,
  IconButton,
  Alert,
  Snackbar,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageIcon from '@mui/icons-material/Image';

// Styled component สำหรับปุ่มอัปโหลดแบบซ่อน input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function ImageUpload({imageUrl,setImageUrl,fileName,setFileName,setSelectedFile,selectedFile}) {


  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleFileInput = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      
      // เริ่มอัปโหลดทันที
      setLoading(true);
      
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        setImageUrl(response.data.imageUrl);
        setSuccess(true);
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        setError(true);
        setErrorMessage("อัปโหลดล้มเหลว: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };




  

  // const handleCloseSnackbar = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setSuccess(false);
  //   setError(false);
  // };

  return (
    <Box
      elevation={5}
      sx={{
        display:"flex",
        flexDirection:"row"
      }}
    >
     
      
      <Stack direction="column" >
        <Box>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
            color="primary"
          >
            รูปภาพ
            <VisuallyHiddenInput 
              type="file" 
              onChange={handleFileInput} 
              accept="image/*" 
            />
          </Button>
          
          {fileName && (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ไฟล์ที่เลือก: {fileName}
            </Typography>
          )}
        </Box>

 
        
        {imageUrl && (
          <Card elevation={2} sx={{ maxWidth: '100%', borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt="Uploaded"
              sx={{ 
                height: 300,
                objectFit: 'contain',
                bgcolor: 'black'
              }}
            />
            
            
          </Card>
        )}
      </Stack>

      {/* Snackbar แจ้งเตือน */}
     
      
      {/* <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar> */}
    </Box>
  );
}

export default ImageUpload;