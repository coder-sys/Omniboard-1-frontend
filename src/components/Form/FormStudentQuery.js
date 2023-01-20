import React, { useState,useEffect } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import NameList from '../NameList/NameList';
import BarChartStudentEnrollment from '../BarChart/BarChartStudentEnrollment';

import { Container } from '../../globalStyles';
import validateForm from './validateForm';

const FormStudentQuery = (props) => {
	const [query, setQuery] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
    const [access,setAccess] = useState("denied")
	const [selectedParam,setSelectedParam] = useState('')
	const [results,setResults] = useState([])
	const [updated,setUpdated] = useState(0)
	const [opacity,setOpacity] = useState(0)
	const [student_graph_data,setStudentGraphData] = useState([])
	function loadNames(){
		if(query!=''){
			return(
	<NameList opacity={opacity} query={query} nameoptions={results}   param={selectedParam} />
			)
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ setQuery });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		setQuery('');

		setError(null);
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Search a student to see their research', value: query, onChange: (e) => {setQuery(e.target.value);setOpacity(1)}, type: 'text' },
	
		
	];
   useEffect(async()=>{
	let select = document.getElementById('param')
									   console.log(select[select.selectedIndex].text)
									   setSelectedParam(select[select.selectedIndex].text)
									   let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/load_data_by_param/${select[select.selectedIndex].text}`)
									   api = await api.json()
									   console.log(api.data)
									   setResults(api.data)								   
let student_data_1 = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/view_student_data_alph_order/student`)
student_data_1 = await student_data_1.json()
setStudentGraphData(student_data_1['graph_data'])

									   
   },[updated])
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						Scroll down to see students list
						<FormTitle>Student Query</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={` ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}
<div style={{transform:'translate(40%,0px)'}}>
<select onChange={async()=>{let select = document.getElementById('param')
									   console.log(select[select.selectedIndex].text)
									   setSelectedParam(select[select.selectedIndex].text)
									   let api = await fetch(`https://espark-apis-tndx3hr7aq-uc.a.run.app/load_data_by_param/${select[select.selectedIndex].text}`)
									   api = await api.json()
									   console.log(api.data)
									   setUpdated(updated+1)
									   setResults(api.data)}} name="param" id="param">
  <option value="firstname">firstname</option>
  <option value="email">email</option>
</select></div>
							<FormButton style={{'opacity':0}} type="submit"></FormButton>
                            <div style={{'width':'100%'}}>
{loadNames()}								</div>

						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
						<BarChartStudentEnrollment graph_data={student_graph_data} />

					</FormColumn>

				</FormRow>

			</Container>
		</FormSection>
	);
};

export default FormStudentQuery;