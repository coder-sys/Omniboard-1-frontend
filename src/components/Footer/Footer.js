import React from 'react';
import {
	FooterLinkItems,
	FooterLinkTitle,
	FooterLink,
	FooterLogo,
	SocialIcon,
	FooterRights,
	FooterSocialIcon,
	FooterWrapper,
	FooterAddress,
	FooterColumn,
	FooterGrid,
} from './FooterStyles';
import { footerData, footerSocialData } from '../../data/FooterData';
import { Row, Section } from '../../globalStyles';

function Footer() {
	return (
		<Section padding="4rem 0 2rem 0">
			<FooterWrapper>
				<FooterGrid justify="space-between">
					<FooterColumn id="footerLogo">
						<FooterLogo to="/">
							<SocialIcon  />
							ESPARK
						</FooterLogo>
						<FooterAddress>
							9870 broadmoor dr, San Ramon, CA 94583
						</FooterAddress>

						<Row align="center" margin="auto  0 0 0" gap="1rem">
							{footerSocialData.map((social, index) => (
								<FooterSocialIcon
									key={index}
									href="/"
									target="_blank"
									aria-label={social.name}
								>
									{social.icon}
								</FooterSocialIcon>
							))}
						</Row>
					</FooterColumn>
					{footerData.map((footerItem, index) => (
						<FooterLinkItems key={index}>
							<FooterLinkTitle>{footerItem.title}</FooterLinkTitle>
							{footerItem.links.map(function(link, linkIndex) {
								if (typeof link === 'string') {
									return (
										<FooterLink key={linkIndex} to={link}>
											{link}
										</FooterLink>
									);
								} else return (
								<FooterLink key={linkIndex} to={link[1]}>
									{link[0]}
								</FooterLink>
								)
								})}
						</FooterLinkItems>
					))}
				</FooterGrid>
				<FooterRights>AFD Enterprises NGO Division © 2023</FooterRights>
			</FooterWrapper>
		</Section>
	);
}

export default Footer;
