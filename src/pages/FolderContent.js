import React,{useState,useReducer,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import HeroFolderContent from '../components/Hero/HeroFolderContent';
import CarouselGoogle from '../components/Carousel/CarouselGoogle';
import CarouselStoredData from '../components/Carousel/CarouselStoredData';
import CarouselYouTube from '../components/Carousel/CarouselYouTube';

const FolderContent = (props) => {
	const {uname,foldername,ut} = useParams()
console.log(uname)
const [name,setName] = useState(uname)
const [update,setUpdated] = useReducer(x=>x+1,0)
const [_foldername_,setFolderName] = useState(foldername)
const [date_err,setDR] = useState(0)


  
  
const UE = async()=>{
	let date_error = await fetch(`http://127.0.0.1:5000/date_subtraction_for_paid_version`)
	date_error = await date_error.json()
	console.log('date err',date_error['data'])
	setDR(date_error['data'])
}
useEffect(()=>{UE()},[update])
if(date_err<30){
	return (
		<>

            <HeroFolderContent CarouselStoredData={CarouselStoredData} CarouselYouTube={CarouselYouTube} CarouselGoogle={CarouselGoogle} name={uname} ut={ut} foldername={_foldername_}/>

		</>
	);}
	else{
		window.location.replace(`https://Omniboard-afd-enterprises.uc.r.appspot.com/errorpage`)
	}
};

export default FolderContent;
//                <Folder  google_data={jsonified_data['google'][index]} youtube_data={jsonified_data['youtube'][index]} task={()=>props.navigation.navigate('FolderContent',{'foldername_':{data},name:name,user_type:user_type})} data={data} dn={'Delete'} task1={()=>Delete(data)}/>
//56 - onClick={()=>props.navigation.navigate('Frontpage',{name:props.name})}