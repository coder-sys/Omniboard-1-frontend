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

	 
	
const SD = 'https://Omniboard.afd.enterprises'
const CarouselStudentData = (props) => {
	const [sliderRef, setSliderRef] = useState(null);
	const [show,setShow] = useState(true)

	return (
		<Section margin="auto" maxWidth="1280px" padding="50px 70px" inverse>
			
			<Row justify="space-between" margin="1rem" wrap="wrap">
				
				<Heading width="auto" inverse>
					{props.jsonified_data[0]['email'][0]}
				</Heading>
				<ButtonContainer>
					<IconContext.Provider value={{ size: '3rem', color: '#1d609c' }}>
						<div style={{opacity:0}}>
					<FaArrowCircleLeft />
						<FaArrowCircleRight />
						</div>
					<TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
						Use Arrows to navigate
					</TextWrapper>

					</IconContext.Provider>
				</ButtonContainer>
			</Row>
				
			<ReviewSlider {...sliderSettings(props.jsonified_data.length/2)} ref={setSliderRef}>
				
				{
				props.jsonified_data.map((data, index) => {
             
						
		return(
		<ImageWrapper key={index}>

			<TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
				<ul style={{fontSize:'15px'}} size="1.1rem" margin="0.4rem 0 0" weight="bold">
				<div>{"Email:"+data['email']}</div><br></br>
				<div>{"firstname: "+data['firstname']}</div><br></br>
				<div>{"lastname: "+data['lastname']}</div><br></br>
				<CardButton onClick={()=>window.open(`${SD}/Folders/${data['email']}/`)}>View </CardButton>
				</ul>
			</TextWrapper>
			
			
		</ImageWrapper>
		)})}
			</ReviewSlider>
		</Section>
	);
};

export default CarouselStudentData;
//            {props.student_alph_lastname[index]}
