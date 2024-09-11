"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";



export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    const user = await User.findOne({ username: to_username });
    const secret = user?.razorpaySecret;
    const id = user?.razorpayid;

    var instance = new Razorpay({ key_id: id, key_secret: secret });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    let x = await instance.orders.create(options)

    // create a payment object that shows the pending payment in the database
    await Payment.create({
        oid: x.id,
        amount: amount / 100,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
    })

    return x;
}


export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    let p = await Payment.find({ to_user: username }).sort({ amount: -1 }).limit(8).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()

    let ndata = Object.fromEntries(data)

    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exits" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        await Payment.updateMany({to_user: oldusername},{to_user: ndata.username})
    }

    else {

        await User.updateOne({ email: ndata.email }, ndata)
    }

}
