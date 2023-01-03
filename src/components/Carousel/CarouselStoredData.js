import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {  data,sliderSettings } from '../../data/CarouselData';
import { Row, Heading, Section, TextWrapper } from '../../globalStyles';
import {
	ButtonContainer,
	ReviewSlider,
	ImageWrapper,
	CarouselImage,
	CardButton,
} from './CarouselStyles';

	 
	

const CarouselStoredData = (props) => {
	const [sliderRef, setSliderRef] = useState(null);
	const [show,setShow] = useState(true)
    return (
		<Section margin="auto" maxWidth="1280px" padding="50px 70px" inverse>
			<Row justify="space-between" margin="1rem" wrap="wrap">
				<Heading width="auto" inverse>
					{props.SDoM}
				</Heading>
				<a href={`https://espark-afd-enterprises.uc.r.appspot.com/homepage/${props.name}/${props.ut}`}><div><b><i>BACK</i></b></div></a>
				<ButtonContainer>
					<IconContext.Provider value={{ size: '3rem', color: '#1d609c' }}>
						<div style={{opacity:0}}>
					<FaArrowCircleLeft />
						<FaArrowCircleRight />
						</div>
					<TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
				<div style={{'opacity':props.sdomo}}>	Use Arrows to navigate</div>
					</TextWrapper>

					</IconContext.Provider>
				</ButtonContainer>
			</Row>
				
			<ReviewSlider {...sliderSettings(props.stored_data_array.length/2)} >
				
				{
                    props.stored_data_array.map((data,index)=>{
                        let linkarray__ = []
                        data['link'].split('').map((data,index)=>{
                            if(data=='`'){
                                linkarray__[index]='/'
                            }
                            else{
                                linkarray__[index]=data
                            }
                        })
                        console.log(linkarray__.join(""))
						if(data['type']=='google'){
		return(
		<ImageWrapper key={index}>
			<TextWrapper width='225' size="1.1rem" margin="0.4rem 0 0" weight="bold">
				<a href={linkarray__.join('')}> <div style={{fontSize:'15px',color:'black'}}><p>{data['name']}</p></div> </a>
			</TextWrapper>
			<TextWrapper>
				{data['description']}
			</TextWrapper>
			<TextWrapper>
			<CardButton onClick={async()=>{ 
                        let emailandlastname = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/get_last_name_and_email/${props.name}`)
                        emailandlastname = await emailandlastname.json()
                        let api= await fetch(`https://espark-api-proxy.ecsbeats.repl.co/delete_saved_data/${props.name+emailandlastname['lastname']+emailandlastname['email']}/${props.foldername}/${data['name']}`)
                        api = await api.json()
                        props.setue(props.update_effect+1)
            }}
                         >Delete</CardButton><br></br><br></br>

			</TextWrapper>
		</ImageWrapper>
		)
		}
		else if(data['type']=='youtube'){
			let thumbnailjoin_ = []
			data['thumbnail'].split('').map((data)=>{
				if(data == '`'){
					data = '/'
				}
				thumbnailjoin_.push(data)
			})
			return(
				<ImageWrapper key={index}>

			<TextWrapper width='225' size="1.1rem" margin="0.4rem 0 0" weight="bold">
				<a href={linkarray__.join('')}> <div style={{fontSize:'15px',color:'black'}}><p>{data['name']}</p></div> </a>
			</TextWrapper>
			<CarouselImage src={thumbnailjoin_.join('')} />

			<TextWrapper>
			<CardButton onClick={async()=>{ 
                        let emailandlastname = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/get_last_name_and_email/${props.name}`)
                        emailandlastname = await emailandlastname.json()
                        let api= await fetch(`https://espark-api-proxy.ecsbeats.repl.co/delete_saved_data/${props.name+emailandlastname['lastname']+emailandlastname['email']}/${props.foldername}/${data['name']}`)
                        api = await api.json()
                        props.setue(props.update_effect+1)
            }}
                         >Delete</CardButton><br></br><br></br>

			</TextWrapper>
					</ImageWrapper>

			)
		}
	})}
			</ReviewSlider>
		</Section>
	);
	
};

export default CarouselStoredData;
