const get_student_ref_link = async(data)=>{
    //homepage redirect
    
        let api = await fetch(`https://Omniboard-apis-tndx3hr7aq-uc.a.run.app/email_to_firstname/${data}`)
        api = await api.json()
      //  return api['data']
      return `https://Omniboard-afd-enterprises.uc.r.appspot.com/homepage/${api['data']}/student`
}
export default get_student_ref_link