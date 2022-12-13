import React,{useEffect} from "react";
import { useState } from "react";
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme
  } from "victory";
  
function BarChartMonthlyFee(props){
    const [monthly_fee,setMF] = useState(10)
    useEffect(async()=>{
        let api = await fetch(`http://http://35.193.47.255//monthly_fee`)
        api = await api.json()
        setMF(api['data'])
    })
return (
    <div style={{'width':220,'height':220}}>
    <VictoryChart
      responsive={true}
 
      domainPadding={{ x: 100 }}
      theme={VictoryTheme.material}
    >
      <VictoryBar
        barRatio={10}
        cornerRadius={10} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
        alignment="middle"
        data={[
          { x: "Your monthly payment fee", y: monthly_fee },
        ]}
      />
    </VictoryChart>
  </div>
)
}
export default BarChartMonthlyFee;