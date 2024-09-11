"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";



const PaymentPage = ({ username }) => {

    // const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast.success("Thanks for your Donation!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        router.push(`/${username}`);

    }, []);


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();

    }


    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />


            <div className='cover w-full relative'>
                <img className='object-cover object-bottom w-full h-[350px]' src={currentUser.coverpic} alt="vk" />
                <div className='absolute bottom-[-10%] flex justify-center w-full'>
                    <img width={130} height={130} className='rounded-full  border-4  border-white' src={currentUser.profilepic} alt="dp" />
                </div>
            </div>
            <div className="info flex justify-center items-center pt-12 md:p-12 flex-col gap-2">
                <div className='font-bold text-xl'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Let&apos;s Help {currentUser.name} to get a cup of tea
                </div>
                <div className='text-slate-400'>

                    {payments.filter(item => item.done).length} supporters • ₹{payments.filter(item => item.done).reduce((sum, item) => sum + item.amount, 0)} raised

                </div>

                <div className="payment flex gap-3 w-full mt-11 flex-col md:flex-row ">
                    <div className="supporters md:w-1/2 bg-slate-900/40 rounded-md p-10">

                        <h2 className='font-bold text-xl my-5'>Supporters </h2>
                        <ul className='mx-5'>

                            {payments.length === 0 && (
                                <div className="text-center font-bold text-lg">
                                    No supporters yet ☹
                                </div>
                            )}

                            {payments.map((p, i) => {
                                if (p.done === true) {
                                    return <li key={i} className='my-5 flex gap-3 items-center'>
                                        <img src="./avatar.gif" alt="user avatar" width={28} />
                                        <span className="text-sm md:text-base">
                                            {p.name} donated{" "}
                                            <span className="font-bold">₹{p.amount}</span>{" "}
                                            {p.message && p.message.length > 0 && (
                                                <span>
                                                    with a message &quot;{p.message}&quot;
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                }
                            })}
                        </ul>
                    </div>

                    <div className="makePayment md:w-1/2 bg-slate-900/40 rounded-md p-10">

                        <h2 className='font-bold text-xl my-5'> Make a Payment </h2>
                        <div className="flex gap-2 flex-col">

                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800/40' placeholder=' Name' />

                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800/40' placeholder=' Message' />

                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800/40' placeholder=' Amount' />

                            <button onClick={() => { pay(paymentform.amount * 100) }} type="button" className="text-white disabled:bg-slate-800 enabled:bg-gradient-to-br from-black to-blue-600 enabled:hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 disabled:cursor-not-allowed " disabled={paymentform.name.length == 0 || paymentform.amount.length == 0}  >Pay</button>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" onClick={() => { pay(10 * 100) }} disabled={paymentform.name.length == 0}>Pay ₹10</button>
                            <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" onClick={() => { pay(20 * 100) }} disabled={paymentform.name.length == 0}>Pay ₹20</button>
                            <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" onClick={() => { pay(50 * 100) }} disabled={paymentform.name.length == 0}>Pay ₹50</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage
