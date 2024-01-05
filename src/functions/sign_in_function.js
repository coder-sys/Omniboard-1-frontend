const sign_in_function = async(fname,lname,password,email)=>{
    let __api__ = await fetch(`http://127.0.0.1:5000/verify_sign_in_information/${email}/${fname}/${lname}`)
    __api__ = await __api__.json()
    
    let user_type = ''
    let disected_address = email.split('@')[1]
    if(__api__['data'] == 'good to go!'){
      if(disected_address == 'k12.prosper-isd.net' || disected_address == 'students.srvusd.net'){
        user_type = 'student'
      }
      if(disected_address == 'prosper-isd.net' || disected_address == 'srvusd.net'){
        user_type = 'teacher'
      }
      
     try{
      if(user_type == 'teacher' || user_type == 'student' ){
    let api = await fetch(`http://127.0.0.1:5000/sign_in/${fname}/${lname}/${password}/${email}/${user_type}`)
    let api_json = await api.json()
    window.location.replace('http://localhost:3001/login')
    return api_json
    }
    else{alert('Use school email to sign in')}
 //   if(user_type == 'student'){
   //   let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/sign_in/${fname}/${lname}/${password}/${email}/${user_type}`)
   //   let api_json = await api.json()
  //    window.location.replace('https://espark-afd-enterprises.uc.r.appspot.com/login')
   //   return api_json

   // }else{ alert('Use PISD account to sign in')}
  }
    catch(err){console.log(err)}
  
  
    }     
    else{
      alert(__api__['data'])
    }
    }
    export default sign_in_function
