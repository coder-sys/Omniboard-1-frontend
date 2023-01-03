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

const FormFolderContentGoogle = (props) => {

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	
	const handleSubmit = (e) => {
		e.preventDefault();
        const resultError = 0
        try{        
            let y = props.folderfield
             resultError = validateForm({ y });
        }catch(err){
            console.log(err)
        }

		if (resultError !== null) {
			setError(resultError);
			return;
		}

	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Google Search', value: props.googlesearch, onChange: (e) => props.setGoogleSearch(e.target.value), type: 'text' },
		
		
	];
	props.setConsent(false)
	return (
		<FormSection id='googlesearch'>
			<Container>
				<FormRow>
					<FormColumn small>
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
								try{
            props.setUpdated(props.updated+1)
			props.setue(props.update_effect+1)
			let api = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/get_google_content/${props.googlesearch}`)
			api = await api.json()
			console.log(api.names)
			props.setRetrieveGoogleData1(api.names)
			props.setRetrieveGoogleData2(api.urls)
			props.setDescription(api.description)
			let emailandlastname = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/get_last_name_and_email/${props.name}`)
			emailandlastname = await emailandlastname.json()
			let lapi = await fetch('https://espark-api-proxy.ecsbeats.repl.co/get_stored_links/'+props.name+emailandlastname['lastname']+emailandlastname['email']+'/'+props.foldername)
			lapi = await lapi.json()
			props.translateLink(api.urls).then((data)=>{
				props.translateLink(lapi.data).then(async(data1)=>{
					try{
						let dt = []
						let dt1 = []
						data.join('').split('').map((data,index)=>{
							if(data == '/'){
								data = '`'
							}
							dt.push(data)
						})
					dt.join('').split('http').map((data,index)=>{
						if(index>0){
						dt1.push('http'+data)
						}
					})
					console.log(dt1.join())
					console.log(`https://espark-api-proxy.ecsbeats.repl.co/find_similarity_links/${dt1.join()}/${data1.join()}`)
					let api = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/find_similarity_links/${dt1.join()}/${data1.join()}`)
					api = await api.json()
					props.setStoredData(api.data)}catch(err){console.log(err)}
			})
			})}catch(err){alert('Error: Too many requests. Google has temporarily blocked you. Try again later.')}
                                    
                                            }} type="submit"> Google Search</FormButton>
                           
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

export default FormFolderContentGoogle;
