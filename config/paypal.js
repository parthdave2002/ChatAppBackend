const axios = require("axios")

const GenerateAccessToken = async () =>{
    try {
        const response = await axios({
            url:process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
            method : "post",
            data : "grant_type=client_credentials",
            auth :{
                username:process.env.PAYPAL_CLIENT_ID,
                password:process.env.PAYPAL_SECRET
            }
        })
        console.log("response >>>>>>>", response.data.access_token);
        return response.data.access_token
        
      } catch (error) {
        console.error(error.message)
        process.exit(1)
      }
}

const CreateOrder = async () =>{
    try {

        const AccessToken = await GenerateAccessToken()
        const response = await axios({
            url:process.env.PAYPAL_BASE_URL+'/v2/checkout/orders',
            method : "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AccessToken
            },
            data : JSON.stringify({
                intent : "CAPTURE",
                purchase_units:[
                    {
                        items :[
                            {
                                name : "Golden",
                                description: "Chat Golden purchase",
                                quantity:1,
                                unit_amount:{
                                    currency_code :"USD",
                                    value : "100.00"
                                }
                            },

                        ],
                        amount:{
                            currency_code :"USD",
                            value : "100.00",
                            breakdown:{
                                item_total:{
                                    currency_code :"USD",
                                    value : "100.00",
                                }
                            }  
                        }
                    }
                ],

                application_context:{
                    return_url : process.env.CLIENT_URL,
                    cancel_url : process.env.CLIENT_URL,
                    shipping_preference : "NO_SHIPPING",
                    user_action:"PAY_NOW",
                    brand_name : "chat app"
                }
            })
        })
        return response.data.links.find(links => links.rel == "approve").href
        
      } catch (error) {
        process.exit(1)
      }
}


const CompleteOrderController = async () =>{
    try {

        const AccessToken = await GenerateAccessToken()
        const response = await axios({
            url:process.env.PAYPAL_BASE_URL+'/v2/checkout/orders',
            method : "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AccessToken
            },
            data : JSON.stringify({
                intent : "CAPTURE",
                purchase_units:[
                    {
                        items :[
                            {
                                name : "Golden",
                                description: "Chat Golden purchase",
                                quantity:1,
                                unit_amount:{
                                    currency_code :"USD",
                                    value : "100.00"
                                }
                            },

                        ],
                        amount:{
                            currency_code :"USD",
                            value : "100.00",
                            breakdown:{
                                item_total:{
                                    currency_code :"USD",
                                    value : "100.00",
                                }
                            }  
                        }
                    }
                ],

                application_context:{
                    return_url : process.env.CLIENT_URL,
                    cancel_url : process.env.CLIENT_URL,
                    shipping_preference : "NO_SHIPPING",
                    user_action:"PAY_NOW",
                    brand_name : "chat app"
                }
            })
        })
        return response.data.links.find(links => links.rel == "approve").href
        
      } catch (error) {
        process.exit(1)
      }
}

module.exports = {
    GenerateAccessToken,
    CreateOrder,
    CompleteOrderController
};