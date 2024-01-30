import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';
import { FormSection } from '../Form/FormStyles';
const HeroInformation = () => {
	return (
		<FormSection>
		<HeroSection>
			<Container>
				<HeroText>

				ESPARK stands out as an internet research platform with a multifaceted approach to information management. It goes beyond just facilitating online research; it's a tool designed to cater to the specific needs of users concentrating on particular subjects.
<br></br>
The platform not only enables users to perform in-depth research on the internet but also provides a robust system for storing and organizing critical information. This suggests that ESPARK acknowledges the importance of not just gathering data but also managing it effectively.
<br></br>

Collaboration is a key aspect of ESPARK, implying that users can work together seamlessly. This collaborative feature could involve sharing findings, insights, or even collectively contributing to a shared body of knowledge. Such collaborative capabilities enhance the tool's utility for teams and individuals working on projects or research initiatives.
<br></br>

Moreover, ESPARK includes note-taking abilities, emphasizing the significance of documenting thoughts, observations, and additional context around the gathered information. This contributes to a comprehensive user experience, making it a tool not just for data collection but for thoughtful analysis and interpretation.
<br></br>

In summary, ESPARK is positioned as more than just an internet research tool; it's a comprehensive solution for users who seek a nuanced approach to focused information gathering, collaboration, and effective knowledge management. Whether you're a researcher, student, or professional, ESPARK appears to offer a holistic platform for your informational needs.				</HeroText>
				
			</Container>
            <img src='/assets/afdenterpriseslogoregular.PNG' style={{marginLeft:'45%','width':'90px','height':'90px',borderRadius:10}} />

		</HeroSection>
		</FormSection>
	);
};

export default HeroInformation;
