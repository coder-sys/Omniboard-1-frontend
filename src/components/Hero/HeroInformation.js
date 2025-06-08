import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton } from './HeroStyles';
import { FormSection } from '../Form/FormStyles';
const HeroInformation = () => {
	return (
		<FormSection>
			<HeroSection style={{
				background: '#f8fafc',
				minHeight: 420,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '32px 0',
				borderBottom: '1px solid #e5e7eb'
			}}>
				<Container style={{
					minHeight: 320,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					maxWidth: 600,
					zIndex: 1
				}}>
					<MainHeading style={{
						marginBottom: 20,
						fontSize: 32,
						color: '#312e81',
						fontWeight: 700,
						letterSpacing: 0.5,
						textAlign: 'center'
					}}>
						Welcome to Omniboard
					</MainHeading>
					<HeroText style={{
						fontSize: 17,
						color: '#334155',
						lineHeight: 1.7,
						background: '#fff',
						borderRadius: 10,
						padding: 20,
						boxShadow: '0 2px 12px 0 #e0e7ff',
						marginBottom: 20,
						maxWidth: 500,
						textAlign: 'center',
						fontWeight: 400
					}}>
						<strong style={{ color: '#6366f1', fontWeight: 600 }}>Omniboard</strong> is a business platform and dashboard system for scalable, data-driven teams and organizations. Centralize your operations with integrated modules for data visualization, collaboration, secure sharing, user management, and analytics. Omniboard adapts to your needs with an intuitive, professional interface.
					</HeroText>
					<div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
						<img src='/assets/teamwork.jpg' alt='Teamwork' style={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #e0e7ff', background: '#fff', border: '1px solid #e5e7eb' }} />
						<img src='/assets/security.jpg' alt='Security' style={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #e0e7ff', background: '#fff', border: '1px solid #e5e7eb' }} />
						<img src='/assets/clients.jpg' alt='Clients' style={{ width: 110, height: 70, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #e0e7ff', background: '#fff', border: '1px solid #e5e7eb' }} />
					</div>
					<img src='/assets/afdenterpriseslogoregular.PNG' style={{ width: '70px', height: '70px', borderRadius: 8, boxShadow: '0 2px 8px #e0e7ff', margin: '0 auto 12px auto', display: 'block', background: '#fff', padding: 4, border: '1px solid #e5e7eb' }} alt="AFD Enterprises Logo" />
				</Container>
			</HeroSection>
		</FormSection>
	);
};

export default HeroInformation;
