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

const FormFolderContentYouTube = (props) => {

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
		{ label: 'YouTube Search', value: props.youtubesearch, onChange: (e) => props.setYoutubeSearch(e.target.value), type: 'text' },
		
		
	];
  
	return (
		<FormSection>
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
                       props.setUpdated(props.updated+1)
                       props.setue(props.update_effect+1)
       
                       let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/get_youtube_data/${props.youtubesearch}`)
                       api = await api.json()
                       props.setyoutubeAPITitles(api.titles)
                       props.setyoutubeAPILinks(api.link)
                       props.setThumbnail(api.thumbnail)
                       console.log(api.titles)
                       props.translateLink(api.link).then((data)=>{
                        props.translateLink(props.linkarray).then(async(data1)=>{
                               try{
                               console.log(data,data1)
                               console.log(`https://espark-apis-tndx3hr7aq-uc.a.run.app/find_similarity_links/${data.join()}/${data1.join()}`)
                               let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/find_similarity_links/${data.join()}/${data1.join()}`)
                               api = await api.json()
                               props.setStoredDataYT(api.data)}catch(err){console.log(err)}
                       })
                       })
                           }} type="submit"> YouTube Search</FormButton>
                           
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

export default FormFolderContentYouTube;
