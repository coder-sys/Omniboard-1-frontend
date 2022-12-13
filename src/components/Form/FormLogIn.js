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

const FormLogIn = (props) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
    const [access,setAccess] = useState("denied")
	
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
    const loginwithgoogle = async(firstname_google) =>{
        let api = await fetch(`http://35.193.47.255/login/${firstname_google}`)
        try{
          let ut = await fetch(`http://35.193.47.255/get_user_type/${firstname_google}`)
                    ut = await ut.json()
                    console.log(ut.data)
                  api = await api.json()
                  console.log(password==api['data'])
                  if(api['data'] == "username not found"){
                    console.log('username not found')
                      alert("username not found")
                  }
                  if(api['data']!='username not found'){
                    setAccess("Granted")
					console.log(ut.data)
                    window.location.replace('http://localhost:3000/homepage/'+firstname_google+'/'+ut.data)
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
								        try{
                                            let api = await fetch(`http://35.193.47.255/login/${name}`)
                                            api = await api.json()
                                            let ut = await fetch(`http://35.193.47.255/get_user_type/${name}`)
                                            ut = await ut.json()
                                            console.log(ut.data)
											
                                            if(api['data'] == "username not found"){
                                              console.log('username not found')
                                                alert("username not found")
                                            }
                                            if(password == api["data"]){
                                              setAccess("Granted")
                                              let ut = await fetch(`http://35.193.47.255/get_user_type/${name}`)
                                                        ut = await ut.json()
                                                        console.log(ut.data)
														window.location.replace('http://localhost:3000/homepage/'+name+"/"+ut.data)

                                              //          props.navigation.navigate('HomePage',{name:fname,user_type:ut.data})
                                            }
                                            else{
                                              alert('Incorrect Password')
                                            }
                                            console.log(access)}
                                            catch(err){alert('you left the username field or the password field empty')}

							}} type="submit">Login In</FormButton>
                            
						</FormWrapper>
						<FormMessage>
						<div >	<GoogleLogin 
            clientId={'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com'}
            onSuccess={(res)=>loginwithgoogle(res.profileObj['name'])}
            onFailure={(res)=>alert('had trouble logging in,please try again')}
           
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
