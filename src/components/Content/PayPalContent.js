import React,{useEffect, useState} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import { View } from "react-native";
import { Container, Section } from '../../globalStyles';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import BarChart from '../BarChart/Barchart';
import BarChartMonthlyFee from '../BarChart/BarChartMonthlyFee'
import {
	ContentRow,
	TextWrapper,
	TopLine,
	Heading,
	ContentButton,
	Subtitle,
	ImgWrapper,
	Img,
	ContentColumn,
	
} from './ContentStyles.js';
 function PayPalContent({
	primary,
	topLine,
	description,
	img,
	alt,
	inverse,
	reverse,
	df,
	vf,
	gdt,
	ydt
}){
  const initial = { opacity: 0, y: 30 };
	const animation = useAnimation();
	const [fee,SF] = useState(10)
	const { ref, inView } = useInView({ threshold: 0.2 });
	useEffect(() => {
		async function getFee() {
		if (inView) {
			animation.start({
				opacity: 1,
				y: 0,
			});
		}
		var api = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/monthly_fee`)
		console.log(api.text)
		api = await api.json()
		SF(api['data_str'])
	}
	getFee()
	}, [inView, animation]);
    return(
      <Section inverse={inverse} ref={ref}>
			<Container >
				<ContentRow reverse={reverse}>
					<ContentColumn >
						<TextWrapper>
							<TopLine
								initial={initial}
								transition={{ delay: 0.3, duration: 0.6 }}
								animate={animation}
							>
                <div style={{'color':'white'}}>Your funds allow us to optimise our products and strengthen our institution</div>
							</TopLine>
							<Heading
								initial={initial}
								transition={{ delay: 0.5, duration: 0.6 }}
								animate={animation}
								inverse={inverse}
							>
							<Container style={{width:100}}>
        <PayPalButton
 options={{clientId:'ARL4hT6ihaLY-usIlRhbx2l86R0AF6DrK94rJbQUkFzMM529xxIN2Y06qBUB-D-vXUF_07rBZDnQZS_u',
 currency:'USD',
}}
amount={fee}
onSuccess={async(details, data) => {
    let api = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/store_timestamp_for_paid_version`)
    api = await api.json()
    console.log(api.data)
   let date_update = await fetch(`https://espark-api-proxy.ecsbeats.repl.co/store_timestamp_for_paid_version`)
   date_update = await date_update.json()
  console.log({ details, data, });
  console.log(details.payer.name.given_name )
  window.location.replace('https://espark-afd-enterprises.uc.r.appspot.com/homepage/admin/admin')
}}
/></Container>
                
                
                							
                </Heading>
							
							
							
						</TextWrapper>
						
					</ContentColumn>
					
					<ContentColumn
						initial={initial}
						transition={{ delay: 0.5, duration: 0.6 }}
						animate={animation}
					>
						<ImgWrapper style={{'backgroundColor':'white',width:300,'borderRadius':'10px'}}>
						<BarChartMonthlyFee />
						</ImgWrapper>
					</ContentColumn>
				</ContentRow>
			</Container>
		</Section>
    )
}
export default PayPalContent