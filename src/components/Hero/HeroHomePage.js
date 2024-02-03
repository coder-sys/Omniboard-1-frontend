import React,{useState,useReducer,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';
import FormHomepage from '../Form/FormHomepage'
import { Content } from '../Content/Content';
import FormStudentQuery from '../Form/FormStudentQuery';
import CarouselStudentData from '../Carousel/CarouselStudentData';
import { AdminPageContent } from '../Content/AdminPageContent';

const DOMAIN = 'http://127.0.0.1:5000'
const SD1 = 'http://localhost:3001'
const HeroHomePage = (props) => {
    const [sw,setSw] = useState(100)
const [hw,setHw] = useState(50)
const [sw1,setSw1] = useState(100)
const [hw1,setHw1] = useState(50)
const [name,setName] = useState(props.name)
const [folderfield,setFolderField] = useState('')
const [update,setUpdated] = useReducer(x=>x+1,0)
const [folderdata,setFolderData] = useState([])
const [ydt,setYdt] = useState([])
const [gdt,setGdt] = useState([])
const [jsonified_data,setJD] = useState({'google':0,'youtube':0})
const [user_type,setUT]=useState(props.ut)
const [student_data,setStudentData] = useState([])
const [teacher_data,setTeacherData] = useState([])
const [student_graph_data,setStudentGraphData] = useState([])
const [teacher_graph_data,setTeacherGraphData] = useState([])
const [date_err,setDR] = useState(0)

  const Delete = async(foldername)=>{
    let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${name}`)
    emailandlastname = await emailandlastname.json()
    let api = await fetch(`${DOMAIN}/delete_folder/${name}/${foldername}`)
    api = await api.json()
    console.log(api.status)
    let api1 = await fetch(`${DOMAIN}/get_folders/${name}`)
  api1 = await api1.json()
  console.log(api.data)
  setFolderData(api1.data)
  console.log(true,name+emailandlastname['lastname']+emailandlastname['email'])
  setUpdated()
  let api2 = await fetch(`${DOMAIN}/delete_no_of_folders/${name}`)
  api2 = await api2.json()
  }
  
const UE = async()=>{
  let date_error = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`)
  date_error = await date_error.json()
  console.log('date err',date_error['data'])
  setDR(date_error['data'])
  const fetchData_student = async()=>{
let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${name}`)
emailandlastname = await emailandlastname.json()
try{
let api1 = await fetch(`${DOMAIN}/get_folders/${name}`)
api1 = await api1.json()
console.log(api1.data)
let statsapi = await fetch(`${DOMAIN}/get_no_of_stored_content/${name}/${api1.data.join('-')}`)
console.log(statsapi.status)
statsapi = await statsapi.json()

try{
setGdt(gdt.push(statsapi['data'][1]))
setYdt(ydt.push(statsapi['data'][0]))}
catch(err){console.log(err)}
setJD({
  'google':statsapi['data'][1],
  'youtube':statsapi['data'][0]
})

setFolderData(api1.data)

}catch(err){console.log('you have no folders')}
}
const fetchData_teacher = async () =>{
  let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${name}`)
emailandlastname = await emailandlastname.json()
let student_data_1 = await fetch(`${DOMAIN}/view_student_data_alph_order/student`)
student_data_1 = await student_data_1.json()
setStudentData(student_data_1['data'])
setStudentGraphData(student_data_1['graph_data'])
console.log(student_data_1['data'])

}
const fetchData_admin = async () =>{
  let student_data_1 = await fetch(`${DOMAIN}/view_student_data_alph_order/student`)
student_data_1 = await student_data_1.json()
setStudentGraphData(student_data_1['graph_data'])
let student_data_2 = await fetch(`${DOMAIN}/view_student_data_alph_order/teacher`)
student_data_2 = await student_data_2.json()
console.log(student_data_2['data'])
setTeacherData(student_data_2['data'])
setTeacherGraphData(student_data_2['graph_data'])

}
if(user_type == 'student'){
fetchData_student()
}
if(user_type == 'teacher'){
  fetchData_teacher()
}
if(user_type == 'admin'||user_type=='adminteacherlist'){
  fetchData_admin()
}
}
useEffect(()=>{UE()},[update])
if(user_type=='student'){
  if(date_err<30){
	return (
		<>
			<HeroVideo src="/assets/hero.mp4" loop autoPlay muted />

      <FormHomepage name={name} folderfield={folderfield} setFolderField={setFolderField} setUpdated={setUpdated} folderdata={folderdata} />
    {folderdata.map((data,index)=>{
      const heroOne = {
        reverse: true,
        inverse: true,
        topLine: {
          text: `Google data -> ${jsonified_data['google'][index]}  YouTube data -> ${jsonified_data['youtube'][index]}`,
        },
        headline: `${data}`,
        buttonLabel1: 'View',
        buttonLabel2: 'Delete',
        imgStart: 'start',
        img: '/assets/svg/Deal.svg',
        start: 'true',
        df:()=>Delete(data),
        vf:()=>window.location.replace(`${SD1}/foldercontent/${name}/${data}/${user_type}`),
        gdt:jsonified_data['google'][index],
        ydt:jsonified_data['youtube'][index]
      };
      return( 
         <Content key={index} {...heroOne} />
)})
    }
		</>
	)}else{
    window.location.replace(SD1+'/errorpage')
  }
}
  if(user_type=='teacher'){
    if(date_err<30){

    return(
      <>

      <FormStudentQuery />
      <div id={'user_carousels'}>
      {
        student_data.map((data,index)=>{
          console.log(data)
          return(
            <CarouselStudentData key={index}  jsonified_data={data}/>
          )
        })
      }
      </div>
      </>
    )}else{
      window.location.replace(SD1+'/errorpage')
    }
  }

  if(user_type=='admin'){

    const heroThree = {
      reverse:true,
      inverse:true,
      topLine:{
        text:'The graph shows teacher enrollment by last initial'
      },
      headline:'Teachers List',
      buttonLabel1:'View',
      graph_data:teacher_graph_data,
      imgStart: 'start',
      img: '/assets/svg/Deal.svg',
      start: 'true',
      vf:()=>window.open(SD1+'/homepage/'+name+'/adminteacherlist')
    }
    const heroTwo = {
      reverse: true,
      inverse: true,
      topLine: {
        text:'The graph shows student enrollment by last initial'
      },
      headline: 'Students List',
      buttonLabel1: 'View',
      graph_data:student_graph_data,
      imgStart: 'start',
      img: '/assets/svg/Deal.svg',
      start: 'true',
      vf:()=>window.open(SD1+'/homepage/'+name+'/teacher')
    }
    console.log(teacher_data)
    if(date_err<30){

   return( <>

   <AdminPageContent {...heroTwo} />
   <AdminPageContent {...heroThree} />

    </>)
  }else{
    window.location.replace('http://localhost:3001/errorpage/payments')
  }
}
  if(user_type=='adminteacherlist'){
    if(date_err<30){
    return(
      <div >
      {
        teacher_data.map((data,index)=>{
          console.log(data)
          return(
            <CarouselStudentData key={index}  jsonified_data={data}/>
          )
        })
      }
      </div>
    )}
    else{
      window.location.replace('http://localhost:3001/errorpage')

    }
  }
  
};

export default HeroHomePage;
//                <Folder  google_data={jsonified_data['google'][index]} youtube_data={jsonified_data['youtube'][index]} task={()=>props.navigation.navigate('FolderContent',{'foldername_':{data},name:name,user_type:user_type})} data={data} dn={'Delete'} task1={()=>Delete(data)}/>
//56 - onClick={()=>props.navigation.navigate('Frontpage',{name:props.name})}