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
    
        let api = await fetch(`http://35.193.47.255/email_to_firstname/${data}`)
        api = await api.json()
      //  return api['data']
      return api['data']
}

function NameList(props){

	console.log(props.param)
	
	const get_email_to_student_map = async(name) =>{
		let api = await fetch(`http://35.193.47.255/email_to_firstname/${name}`)
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
											<FormMessage><p style={{'color':'black'}}><CardButton onClick={async()=>{window.open(`http://espark-afd-enterprises.uc.r.appspot.com/homepage/${data}/student`)}}><b>{data}</b></CardButton></p></FormMessage>
					</FormRow>
										)
									}
									else if(props.param == 'email'){
										
									return(
											<FormRow key={index}>
											<FormMessage><p style={{'color':'black'}}><CardButton onClick={async()=>{
												let api = await fetch(`http://35.193.47.255/email_to_firstname/${data}`)
												api = await api.json()
													console.log(api['data'])
													window.location.replace(`http://espark-afd-enterprises.uc.r.appspot.com/homepage/${api['data']}/student`)
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
