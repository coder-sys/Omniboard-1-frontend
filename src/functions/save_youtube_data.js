const save_youtube_data = async(setue,update_effect,youtubeAPILinks,youtubeAPITitles,index,ytlinkjoin_,ytdjoin_,data,stored_data_yt,name,foldername,thumbnail,thumbnailjoin_)=>{
    //document.getElementById('savesourcebutton').disable = true
    
                                    setue(update_effect+1)
                                    thumbnail[index].split('').map((data_)=>{
                                        if(data_ == '/'){
                                            console.log('alert')
                                            data_ = '`'
                                        }
                                        thumbnailjoin_.push(data_)
                                    })
                                    youtubeAPILinks[index].split('').map((data_)=>{
    
                                        if(data_ == '/'){
                                            console.log('alert')
                                            data_ = '`'
                                        }
                                        ytlinkjoin_.push(data_)
        
                                    })
                                    data.split('').map((_)=>{
                                        if(_ == '/'){
                                            _ = "`"
                                             console.log('alert')
                                        }
                                        ytdjoin_.push(_)
        
                                    })
                                
                                    stored_data_yt[index] = true
                                    console.log(ytlinkjoin_)
                                    console.log('link is '+ytlinkjoin_.join("").split('=')[1])
                                    try{
      let emailandlastname = await fetch(`http://35.193.47.255/get_last_name_and_email/${name}`)
      emailandlastname = await emailandlastname.json()
                console.log(thumbnail[index])
                let yttitlejoin = []
                youtubeAPITitles[index].split('').map((data)=>{
                    if(data == '?'){
                        data = ''
                    }
                    if (data != ''){
                    yttitlejoin.push(data)
                    }
                    
                })
                
                                    let api = await fetch(`http://35.193.47.255/add_youtube_content/${name+emailandlastname['lastname']+emailandlastname['email']}/${foldername}/${yttitlejoin.join('')}/${ytlinkjoin_.join("").split('=')[1]}/${thumbnailjoin_.join('')}`)
                                    api = await api.json()
                                    console.log(api)}catch(err){alert('could not save source')}
                                   }
export default save_youtube_data;