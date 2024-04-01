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
import axios from 'axios';

import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script'
import { Container } from '../../globalStyles';
import validateForm from './validateForm';
import Cookies from 'js-cookie';
import useToken from "./useToken"

const DOMAIN = 'https://espark-apis.afd.enterprises'
const SD = 'https://espark.afd.enterprises'
const SD1 = 'https://espark-old.afd.enterprises'
const FormLogIn = (props) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
    const [access,setAccess] = useState("denied")
	const setCookie = async(email) => {
		let api = await fetch(`${DOMAIN}/set_cookie/${email}`)
		api = await api.json()
		
		Cookies.set('session_id', api['data'], { expires: 7 }); // expires in 7 days
	  };
	  
	   useEffect(async()=>{
		function start(){
		  gapi.auth2.init({
			'clientId':'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com'
		  })
		}
		gapi.load('client:auth2',start)

	  },[])
	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ name, password });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		setName('');

		setPassword('');
		setError(null);
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'first name', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{
			label: 'Password',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: 'password',
		},
		
	];

	const { token, removeToken, setToken } = useToken();
    const loginwithgoogle = async(firstname_google) =>{
        
        try{
			let preapi3 = await fetch(`${DOMAIN}/get_last_name_and_email/${firstname_google}`)
			preapi3 = await preapi3.json()
		    let preapi2 = await fetch(`${DOMAIN}/set_cookie/${preapi3.email}`)
			preapi2 = await preapi2.json()
			setCookie(preapi3.email)
          let ut = await fetch(`${DOMAIN}/get_user_type/${firstname_google}`)
                    ut = await ut.json()
					let api = await fetch(`${DOMAIN}/login/${firstname_google}`)
                  api = await api.json()
				  setToken(api.access_token)
				  localStorage.setItem('name', firstname_google)
                  console.log(password==api['data'])
                  if(api['data'] == "username not found"){
                    console.log('username not found')
                      alert("username not found")
                  }
                  if(api['data']!='username not found'){
                    setAccess("Granted")
					console.log(ut.data)
					
														if(ut.data=='student'){
															window.location.replace(SD+'/folders/'+preapi3['email'])
														}
														else{
															window.location.replace(SD1+'/homepage/'+name+"/"+ut.data)
															}
                  }
                  else{
                    alert('Username not found')
                  }
                  console.log(access)
  
                }catch(err){console.log(err);alert('Account does not exist')}
                          
      }
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Log In</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton onClick={async()=>{
								        
											let preapi3 = await fetch(`${DOMAIN}/get_last_name_and_email/${name}`)
											preapi3 = await preapi3.json()
		    								let preapi2 = await fetch(`${DOMAIN}/set_cookie/${preapi3.email}`)
											preapi2 = await preapi2.json()
											setCookie(preapi3.email)
                                            let api = await fetch(`${DOMAIN}/login/${name}`)
                                            api = await api.json()
											setToken(api.access_token)
				  							localStorage.setItem('name', name)
                                            let ut = await fetch(`${DOMAIN}/get_user_type/${name}`)
                                            ut = await ut.json()
                                            console.log(ut.data)
											
                                            if(api['data'] == "username not found"){
                                              console.log('username not found')
                                                alert("username not found")
                                            }
                                            if(password == api["data"]){
                                              setAccess("Granted")
                                              let ut = await fetch(`${DOMAIN}/get_user_type/${name}`)
                                                        ut = await ut.json()
                                                        console.log(ut.data)
														if(ut.data=='student'){
															window.location.replace(SD+'/folders/'+preapi3['email'])
														}
														else{
														window.location.replace(SD1+'/homepage/'+name+"/"+ut.data)
														}
                                            }
                                            else{
                                              alert('Incorrect Password')
                                            }
                                            console.log(access)

							}} type="submit">Login In</FormButton>
                            
						</FormWrapper>
						<FormMessage>
						<div >	<GoogleLogin 
            clientId={'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com'}
            onSuccess={(res)=>loginwithgoogle(res.profileObj['name'])}
            onFailure={(res)=>alert('had trouble logging in,please try again')}
           isSignedIn={false}
	   buttonText={"Login with google"}
      /></div>

						</FormMessage>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
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

export default FormLogIn;
