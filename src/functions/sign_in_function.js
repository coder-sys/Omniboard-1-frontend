const sign_in_function = async(fname,lname,password,email)=>{
    let __api__ = await fetch(`http://35.193.47.255/verify_sign_in_information/${email}/${fname}/${lname}`)
    __api__ = await __api__.json()
    
    let user_type = ''
    let disected_address = email.split('@')[1]
    if(__api__['data'] == 'good to go!'){
      if(disected_address == 'k12.prosper-isd.net'){
        user_type = 'student'
      }
      if(disected_address == 'prosper-isd.net'){
        user_type = 'teacher'
      }
      
     try{
      if(user_type == 'teacher' || user_type == 'student' ){
    let api = await fetch(`http://35.193.47.255/sign_in/${fname}/${lname}/${password}/${email}/${user_type}`)
    let api_json = await api.json()
    window.location.replace('http://espark-afd-enterprises.uc.r.appspot.com/login')
    return api_json
    }
    else{alert('Use PISD email to sign in')}
 //   if(user_type == 'student'){
   //   let api = await fetch(`http://35.193.47.255/sign_in/${fname}/${lname}/${password}/${email}/${user_type}`)
   //   let api_json = await api.json()
  //    window.location.replace('http://espark-afd-enterprises.uc.r.appspot.com/login')
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