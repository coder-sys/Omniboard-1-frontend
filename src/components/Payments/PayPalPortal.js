import {PayPalButton} from 'react-paypal-button-v2'
import React from "react";
const DOMAIN = 'https://espark-apis.afd.enterprises'
const SD1 = 'https://espark-old.afd.enterprises'
const PayPalPortal = async()=>{
    return(

<PayPalButton 
 options={{clientId:'ARL4hT6ihaLY-usIlRhbx2l86R0AF6DrK94rJbQUkFzMM529xxIN2Y06qBUB-D-vXUF_07rBZDnQZS_u',
 currency:'USD',
}}
amount='10'
onSuccess={async(details, data) => {
    let api = await fetch(`${DOMAIN}/store_timestamp_for_paid_version`)
    api = await api.json()
    console.log(api.data)
   
  console.log({ details, data, });
  console.log(details.payer.name.given_name )
  window.location.replace(SD1+'/homepage/admin/admin')
}}
/>

              
    )
}
export default PayPalPortal;