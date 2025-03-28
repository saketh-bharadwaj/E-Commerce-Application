import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { VendorInfoModel, VendorModel } from "../../models/vendorModel.js";

const router = express.Router();

router.post('/signin',async function(req, res){
    const email=req.body.email;
    const password=req.body.password;

    const response = await VendorModel.findOne({
        email: email
    })
    if(!response){
        res.status(403).json({
            success: false,
            message: "User does not exist"
        })
        return;
    }
    const passwordMatch=await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token=jwt.sign({
            id: response._id.toString()
        },process.env.JWT_SECRET);

        const vendorInfo = await VendorInfoModel.findOne({
            vendorId: response._id
        })

        res.json({
            success: true,
            token: token,
            data: vendorInfo
        })
    }
    else {
        res.status(403).json({
            success: false,
            message: "Invalid Credentials"
        })
    }
})

export default router;