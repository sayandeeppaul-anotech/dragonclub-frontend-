import React, { useEffect, useState } from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, Typography, Button,Grid , Box,List,ListItem,Avatar} from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Two from '../Components/Two';
import Stage from '../Components/Stage';
import BottomHome from './BottomHome';
import LoadingLogo from "./LoadingLogo";


const circleStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: '#3498db', // Default background color
  margin: '0',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: "100%"
};
const Home = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

 
  const images = [
    {
      id: 1,
      src: 'assets/images/dragon1.jpg',
      alt: 'First Image'
    },
    {
      id: 2,
      src: 'assets/images/dragon2.jpg',
      alt: 'Second Image'
    },
    {
      id: 3,
      src: 'assets/images/dragon3.jpg',
      alt: 'Third Image'
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, );

  const imageUrls = [
    'assets/images/gamecategory_20231215033613klhe.png',
    'assets/images/gamecategory_202312150336204mtb.png',
    'assets/images/gamecategory_20231215033607yi17.png',
    'assets/images/gamecategory_20231215033600k8os.png',
    'assets/images/gamecategory_20231215033554mpgb.png',
    'assets/images/gamecategory_20231215033528g3gt.png',
    'assets/images/gamecategory_2023121503353389nc.png',
    'assets/images/gamecategory_202312150336366phx.png',
  ];

  const [subtitles] = useState([
    'Lottery',
    'Slots',
    'Sports',
    'Casino',
    'PVC',
    'Finishing',
    'Mini games',
    'Popular',
  ]);

  const imageUrl = 'assets/images/lottery-7b8f3f55.png';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/head"); // Navigate to the specified link
  };
  const handleClick1 = () => {
    navigate("/k3"); // Navigate to the specified link
  };
  const handleClick2 = () => {
    navigate("/trx"); // Navigate to the specified link
  };

  const menuItems = [
    { text: 'Lottery', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141426883l.png' },
    { text: 'Popular', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141435wkxx.png' },
    { text: 'Slots', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141445b3ka.png' },
    { text: 'Fishing', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141457h3ts.png' },
    { text: 'PVC', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141515owja.png' },
    { text: 'Casino', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_202403111415086ujt.png' },
    { text: 'Sports', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141522uvco.png' },
  
];

const contentTabs = [
  { title: 'Win Go', path: '/head',icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_202307140102511fow.png'], description: 'Green/Red/Purple', description2: 'Guess Number' },
  { title: 'K3', path: '/k3', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_20230714010227swu2.png'], description: 'Big/Small/Odd/Even', description2: 'Guess Number' },
  { title: 'Aviator',path: '/redirect-to-second-website', icons: ['https://ossimg.9987cw.cc/TC/gamecategory/gamecategory_2023121503353389nc.png'], description: 'Big/Small/Odd/Even', description2: 'Guess Number' },
  { title: 'Trx Win',path: '/trx', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_20230714010246lyuc.png'], description: 'Green/Red/Purple', description2: 'Guess Number' },
];
const [activeTab, setActiveTab] = useState(0);  // Add this line


const handleDownload = () => {
  // Programmatically click the hidden anchor tag
  const link = document.createElement('a');
  link.href = `https://111club.online/abclottery.apk`; // Change this to the actual path of the APK file on your server
  link.download = 'abclottery.apk';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000); // 2 seconds

  // Cleanup function to clear the timeout if the component unmounts before 2 seconds
  return () => clearTimeout(timer);
}, []); 
  return (
    <div style={{ position: 'relative' }}>
      <Mobile>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}>
          <LoadingLogo websiteName="Dragon" />
        </div>
      )}
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
          sx={{
            backgroundColor: 'rgb(34,39,91)', // Base background color
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '1px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgb(34,39,91)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgb(34,39,91)',
            },
          }}
          
        >
          <Box flexGrow={1} sx={{backgroundColor:"rgb(34,39,91)"}}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgb(34,39,91)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
              <img src="assets/images/banner3.png" alt="logo" style={{width:"100px",height:"30px"}}/>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton style={{color:"white"}} onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
<IconButton style={{color:"white"}} onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
              </Grid>
            </Grid>

            {/* //content */}
           

            <Grid item xs={12} style={{ display: 'flex' }}>
              {images.map((image, index) => (
                <Paper key={image.id} sx={{ display: index === currentIndex ? 'block' : 'none', width: '100%' }}>
                  <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto', margin: 0 }} />
                </Paper>
              ))}
            </Grid>

            <Grid container alignItems="center" sx={{ backgroundColor: "rgb(34,39,91)" }}  >
              <Grid item xs={2} align="left">
                <IconButton>
                  <VolumeUpIcon sx={{ color: "white" }} />
                </IconButton>
              </Grid>
              <Grid item xs={6} align="left" >
                <div style={{ overflow: 'hidden', height: '24px', position: 'relative' }}>

                  <Typography

                    variant="caption"
                    style={{
                      position: 'absolute',
                      color: "white",
                      fontSize: '8px',


                    }}
                  >
                 For your convenience to ensure the safety of your account and successful withdrawal process. Please fill the genuine mobile active number register in your bank account. thanks for your cooperation
                  </Typography>

                </div>
              </Grid>


              <Grid item xs={4}>
                <Button
                  variant="contained"
                  startIcon={<Whatshot />}
                  sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'Rgb(55,72,146)', color: 'white' }}
                >
                  Details
                </Button>
              </Grid>
            </Grid>

            
            

            <Box display="flex" mx={1} mt={2}>
            <Box mr={2}>
    <List>
        {menuItems.map((item, index) => (
           <ListItem 
           key={index} 
           button 
           style={{ 
               backgroundColor: index === activeTab ? 'Rgb(55,72,146)' : 'transparent',
               borderRadius: index === activeTab ? '10px' : '0px' ,
               color: index === activeTab ? 'white' : 'white'  // Add this line
           }}
           onClick={() => setActiveTab(index)}
       >
           <Box display="flex" flexDirection="column" alignItems="center">
               <Avatar src={item.icon} alt={item.text} />
               <Typography variant="body2">{item.text}</Typography>
           </Box>
       </ListItem>
        ))}
    </List>
</Box>
            <Box flexGrow={1}>
    {contentTabs.map((tab, index) => (
        <Box key={index} mb={2} p={2} bgcolor="background: -webkit-linear-gradient(324.57deg,  #007aff 12.38%, #73A6DC 87.13%);
      background-image: -webkit-linear-gradient(324.57deg, #007aff 12.38%, #73A6DC  87.13%);
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: initial;" borderRadius={4} width="90%"
      onClick={() => navigate(tab.path)}>  {/* Modify this line */}
            <Box display="flex" justifyContent="space-between" alignItems="stretch" mb={1}>
            <Box flexGrow={1} align="left" >
    <Typography variant="h6" style={{ color:"white",fontWeight:"bold" }}>{tab.title}</Typography>
    <Typography variant="body1"  style={{ color:"white",fontWeight:"bold" }}>{tab.description2}</Typography>
    <Typography variant="caption" style={{ color:"white",fontWeight:"bold" }}>{tab.description}</Typography>
</Box>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    {tab.icons.map((icon, iconIndex) => (
                        <Avatar key={iconIndex} src={icon} alt={`Icon ${iconIndex}`}  style={{ height: '80px', width: '80px' }} />
                    ))}
                </Box>
            </Box>
        </Box>
    ))}
</Box>
        </Box>


         

          
<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: "5px",marginRight:"5px",marginTop:"150px",marginBottom:"200px" }}>

<Stage/>



</Grid>

<BottomHome/>


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default Home