import React,{useState,useEffect} from 'react';
import { Container } from '../../globalStyles';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from '../Form/FormStyles';
import {
	ButtonContainer,
	ReviewSlider,
	ImageWrapper,
	CardButton,
} from '../Carousel/CarouselStyles';
const get_student_ref_link = async(data)=>{
    //homepage redirect
    
        let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/email_to_firstname/${data}`)
        api = await api.json()
      //  return api['data']
      return api['data']
}
const DOMAIN = 'http://127.0.0.1:5000'
const SD = 'http://localhost:3000'
const SD1 = 'http://localhost:3001'
function NameList(props){

	console.log(props.param)
	
	const get_email_to_student_map = async(name) =>{
		let api = await fetch(`${DOMAIN}/email_to_firstname/${name}`)
		api = await api.json()
		console.log(name,api['data'])
		return api['data']
	}
	return (
		< >
			<Container style={{opacity:props.opacity}}>
                
				<FormRow>
					<FormColumn style={{opacity:.5}}>
						{
							props.nameoptions.filter(student=>student.toLowerCase().includes(props.query))
								.map((data,index)=>{

									if(index<4){
										if(props.param == 'firstname'){
										return(
											<FormRow key={index}>
											<FormMessage><p style={{'color':'black'}}><CardButton onClick={async()=>{
												
												let api = await fetch(`${DOMAIN}/get_last_name_and_email/${data}`)
												api = await api.json()
												window.open(`${SD}/Folders/${api['email']}`)}}><b>{data}</b></CardButton></p></FormMessage>
					</FormRow>
										)
									}
									else if(props.param == 'email'){
										
									return(
											<FormRow key={index}>
											<FormMessage><p style={{'color':'black'}}><CardButton onClick={async()=>{
												let api = await fetch(`${DOMAIN}/email_to_firstname/${data}`)
												api = await api.json()
													console.log(api['data'])
													window.location.replace(`${SD}/Folders/${data}/`)
											}}><b>{data}</b></CardButton></p></FormMessage>
					</FormRow>
										)
									}
									}
								
							})
					
}
						
					</FormColumn>
				
				</FormRow>
			</Container>
		</>
	);
};

export default NameList;
