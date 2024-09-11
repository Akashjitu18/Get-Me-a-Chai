'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({})

  useEffect(() => {

    if (!session) {
      router.push("/login");
    }
    else {
      getData()
    }
  }, [router, session])

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setForm(u)
  }


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    toast.success("Profile Updated", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }


  return (
  
  <>

    <ToastContainer
      position="top-center"
      autoClose={1500}
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


    <div className='container mx-auto py-5'>
      <h2 className='text-3xl font-bold text-center p-5'>Welcome to your dashboard</h2>



      <form className="max-w-sm md:max-w-lg mx-auto pb-5 px-3 md:px-0" action={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
          <input type="text" value={form.name ? form.name : ""} onChange={handleChange} name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
          <input type="email" value={form.email ? form.email : ""} onChange={handleChange} name='email' id="email" className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900/70 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white/70 focus-visible:outline-none cursor-not-allowed" readOnly title='Email can&apos;t be modified' />
        </div>
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
          <input type="text" value={form.username ? form.username : ""} onChange={handleChange} name='username' id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* Profile Picture */}
        <div className="mb-3">
          <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-white">Profile Picture</label>
          <input type="url" value={form.profilepic ? form.profilepic : ""} onChange={handleChange} name='profilepic' id="profilepic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* Cover Image */}
        <div className="mb-3">
          <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-white">Cover Picture</label>
          <input type="url" value={form.coverpic ? form.coverpic : ""} onChange={handleChange} name='coverpic' id="coverpic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* razorpay id */}
        <div className="mb-3">
          <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">razorpay Id</label>
          <input type="text" value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} name='razorpayid' id="razorpayid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* razorpay Secret */}
        <div className="mb-5">
          <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-white">razorpay Secret</label>
          <input type="text" value={form.razorpaySecret ? form.razorpaySecret : ""} onChange={handleChange} name='razorpaySecret' id="razorpaySecret" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {/* Save button */}
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
      </form>
    </div>

  </>

  )
}

export default Dashboard