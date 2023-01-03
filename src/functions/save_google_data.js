const save_google_data = async(setue,data,update_effect,linkjoin_,retrievegoogledata1,index,djoin_,stored_data,name,lastname,email,foldername,description)=>{
        setue(update_effect+1)
        data.split('').map((data_)=>{
            if(data_ == '/'){
                console.log('alert')
                data_ = '`'
            }
            linkjoin_.push(data_)

        })
        retrievegoogledata1[index].split('').map((_)=>{
            if(_ == '/'){
                _ = "`"
                console.log('alert')
            }
            if(_ == '?'){
                _ = ''
            }
            djoin_.push(_)

        })
    

        stored_data[index] = true

    try{    
    let eal = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/get_last_name_and_email/${name}`)
    eal = await eal.json()
        let api = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/add_google_content/${name+lastname+email}/${foldername}/${djoin_.join("")}/${linkjoin_.join("")}/${description[index]}`)
        api = await api.json()
        console.log(api)
    }
    catch(err){
     alert('This site has been blocked from being saved')

    }
       
       
}
export default save_google_data;