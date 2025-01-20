const express = require("express");
const { CreateOrder } = require("../../config/paypal");

const PlanPaymentController = async(req, res) =>{  

    try {

        const url = await CreateOrder();
    
        return res.status(200).json({
            data: url,
            message:"Payment successfully",
            success:true,
        })  
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}


module.exports = {
    PlanPaymentController,
}