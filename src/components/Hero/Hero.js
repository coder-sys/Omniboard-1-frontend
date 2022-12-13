import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton,HeroIMG } from './HeroStyles';
import { osName } from "react-device-detect";

const Hero = () => {
	console.log(window.innerWidth,window.innerHeight,window.innerWidth*window.innerHeight,osName)
	if(osName=='iOS'){
	return (
		<HeroSection>
			<HeroIMG src="./assets/techno.png" loop autoPlay muted />
			<Container>
				<MainHeading>Internet research just got easier with <i>ESPARK</i></MainHeading>
				<HeroText>
					We provide the best internet data research assistant tools to students out there
				</HeroText>
				<ButtonWrapper>
					<Link to="signup">
						<Button>Get Started</Button>
					</Link>
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);}
	else{
		return(
		<HeroSection>
			<HeroVideo src="./assets/hero.mp4" loop autoPlay muted />
			<Container>
				<MainHeading>Internet research just got easier with <i>ESPARK</i></MainHeading>
				<HeroText>
					We provide the best internet data research assistant tools to students out there
				</HeroText>
				<ButtonWrapper>
					<Link to="signup">
						<Button>Get Started</Button>
					</Link>
				</ButtonWrapper>
			</Container>
		</HeroSection>)
	}
};

export default Hero;
