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
			<HeroIMG src="/assets/techno.png" loop autoPlay muted />
			<Container>
				<MainHeading>Accelerate Your Business Intelligence with <i>Omniboard</i></MainHeading>
<HeroText>
	Omniboard delivers powerful data research and analysis tools tailored for modern businesses and teams.
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
			<HeroVideo loop autoPlay muted>
				<source src="/assets/bg.mp4" type="video/mp4" />
			</HeroVideo>
			<Container>
				<MainHeading>Accelerate Your Business Intelligence with <i>Omniboard</i></MainHeading>
<HeroText>
	Omniboard delivers powerful data research and analysis tools tailored for modern businesses and teams.
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
