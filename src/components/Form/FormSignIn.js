import React, { useState,useEffect } from 'react';
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
} from './FormStyles';

import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script'
import { Container } from '../../globalStyles';
import validateForm from './validateForm';
import sign_in_function from '../../functions/sign_in_function';
const FormSignIn = () => {
	const [name, setName] = useState('');
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const signinwithgoogle = async(firstname,lastname,__password__,__email__) =>{
		let __api__ = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/verify_sign_in_information/${__email__}/${firstname}/${lastname}`)
	  __api__ = await __api__.json()
	  let user_type = ''
	  let disected_address = __email__.split('@')[1]
	  console.log(disected_address)
	  if(__api__['data'] == 'good to go!'){
		if(disected_address == 'k12.prosper-isd.net' || disected_address == 'students.srvusd.net'){
		  user_type = 'student'
		}
		if(disected_address == 'prosper-isd.net' || disected_address == 'students.srvusd.net'){
		  user_type = 'teacher'
		}
		if(user_type == 'teacher' || user_type == 'student'){
			let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/sign_in/${firstname}/${lastname}/${__password__}/${__email__}/${user_type}`)
			let api_json = await api.json()
			window.location.replace('https://espark-afd-enterprises.uc.r.appspot.com/login')
			return api_json
			}
			else{alert('Use school email to sign in')}
			 
		  
			}     else{  
				 alert('You have an account associated with this email')
		  }
	  }
	   useEffect(()=>{
		function start(){
		  gapi.client.init({
			'clientId':'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com',
			scope:''
		  })
		}
		gapi.load('client:auth2',start)
	  })
	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ name, email, password, confirmPass });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		setName('');
		setLname('');

		setEmail('');
		setPassword('');
		setConfirmPass('');
		setError(null);
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Name', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{label: 'Last Name',value:lname,onChange:(e)=>setLname(e.target.value),type:'text'},
		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Password',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: 'password',
		},
		{
			label: 'Confirm Password',
			value: confirmPass,
			onChange: (e) => setConfirmPass(e.target.value),
			type: 'password',
		},
	];
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Sign up</FormTitle>
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

							<FormButton onClick={()=>{
								 try{
									sign_in_function(name,lname,password,email)
								  }
								catch(err){alert('You left some fields empty')}

							}} type="submit">Signup</FormButton>
							
						</FormWrapper>
						<FormMessage>
						<div>	<GoogleLogin 
     clientId={'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com'}
      onSuccess={(res)=>signinwithgoogle(res.profileObj['name'],res.profileObj['givenName'],res.profileObj['googleId'],res.profileObj['email'])}
      onFailure={(res)=>alert('if you are using google to sign in,please try again later',res)}
      isSignedIn={false}
/></div>
						</FormMessage>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				
				</FormRow>
				
			</Container>
		</FormSection>
	);
};

export default FormSignIn;
