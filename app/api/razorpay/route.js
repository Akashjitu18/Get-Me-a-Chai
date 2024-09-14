import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Razorpay from "razorpay";

 export const POST = async(req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // check if razorpay id is present on server
    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "OrderId Not found"})
    }

    let user = await User.findOne({username: p.to_user})
    if(!user){
        return NextResponse.json({success: false, message: "User not found"})
    }
    const secret = user.razorpaySecret

    let xx = validatePaymentVerification({"order_id" : body.razorpay_order_id , "payment_id" : body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(xx){
        // update the payment in the database
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done : true} , {new: true})
       // Construct the absolute URL for redirection
       // const redirectUrl = new URL(`/${updatedPayment.to_user}?paymentdone=true`, process.env.NEXT_PUBLIC_URL).toString()
        console.log("redirect " , redirectUrl)
       // return NextResponse.redirect(redirectUrl)
       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false, message: "Payment verification failed"})
    }

}

