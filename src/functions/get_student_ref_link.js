const get_student_ref_link = async(data)=>{
    //homepage redirect
    
        let api = await fetch(`http://35.193.47.255/email_to_firstname/${data}`)
        api = await api.json()
      //  return api['data']
      return `http://espark-afd-enterprises.uc.r.appspot.com/homepage/${api['data']}/student`
}
export default get_student_ref_link