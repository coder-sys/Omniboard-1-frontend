import React, { useState,useReducer } from 'react';
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
	
} from './FormStyles';


import { Container } from '../../globalStyles';
import validateForm from './validateForm';

const FormHomepage = (props) => {
//#const [name, setName] = useState('SRINIDHI MURTHY');
//    const [ut,setUT] = useState('')
//	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
   const [folderfield,setFolderField] = useState('')
   function returnMessage(){
	if(props.folderdata.length == 0){
		return 'You have zero folders as of right now'
	}else if (props.folderdata.length == 1){
		return `You have ${props.folderdata.length} folder,scroll down to view`
	}
	else{
		return `You have ${props.folderdata.length} folders,scroll down to view`

	}
   }
//    const [update,setUpdated] = useReducer(x=>x+1,0)
//    const [folderdata,setFolderData] = useState([])	

//const [ydt,setYdt] = useState([])
//const [gdt,setGdt] = useState([])
//const [jsonified_data,setJD] = useState({'google':0,'youtube':0})   
	const handleSubmit = (e) => {
		e.preventDefault();
        const resultError =0
            let y = folderfield
             resultError = validateForm({ y });
        

		if (resultError !== null) {
			setError(resultError);
			return;
		}

		props.setFolderField('');
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Create Folder', value: props.folderfield, onChange: (e) => props.setFolderField(e.target.value), type: 'text' },
		
		
	];
  
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
					<FormLabel><b><i>{returnMessage()}</i></b></FormLabel>

						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton onClick={async()=>{
            
                                    let emailandlastname = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/get_last_name_and_email/${props.name}`)
                                    emailandlastname = await emailandlastname.json()
                                              let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/add_folder/${props.name+emailandlastname['lastname']+emailandlastname['email']}/${props.folderfield}`)
                                              api = await api.json()
                                              console.log(api)
                                    
                                              props.setFolderField("");
                                                props.setUpdated();
                                                let ufa = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/update_no_of_folders/${props.name}`)
                                                ufa = await ufa.json()
                                            }} type="submit">Create Folder to store your internet research</FormButton>
                           
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{'------'}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
							</FormMessage>
						)}
					</FormColumn>
				
				</FormRow>
				
			</Container>
		</FormSection>
	);
};

export default FormHomepage;
