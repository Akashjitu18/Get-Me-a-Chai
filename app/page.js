import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0">
        <div className="font-bold flex justify-center items-end md:gap-2 text-5xl">
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent ">
            Get Me A Chai{" "}
          </span>
          <span className="">
            <img
              src="./tea.gif"
              alt="tea"
              className="bg-blend-luminosity w-[200px] md:w-[70px] mb-[-7px]"
            />
          </span></div>
        <p>A crowdfundung platform for creators. Get funded by your fans and followers. Start Now!</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>

      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-20">
        <h1 className="text-xl font-bold text-center mb-14 ">Your Fans can buy you a Chai</h1>
        <div className="flex gap-10 md:gap-5 justify-around flex-col md:flex-row" >
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full " src="./man.gif" width={88} alt="man" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">your fans are available to support you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full " src="./dollar.gif" width={88} alt="man" />
            <p className="font-bold">Fans want to contribute</p>
            <p className="text-center">your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full " src="./group.gif" width={88} alt="man" />
            <p className="font-bold">Fans want to collaborate</p>
            <p className="text-center">your fans are ready to collaborate with you</p>

          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>


      <div className="text-white container mx-auto py-20">
        <h2 className="text-xl font-bold text-center ">Learn More About Us</h2>
        <div className="px-1 md:px-5 mt-4">


          <p className="p-4 text-gray-200 text-md text-center font-sans">
            At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            Our mission is to empower talented individuals by facilitating financial support, allowing them to focus on what they do best – creating. Whether you&apos;re a developer coding the next big app, a content creator making engaging videos, or an influencer sharing your passion, Get Me A Chai is here to help you achieve your goals.
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.
          </p>
        </div>
      </div>
    </>
  );
}
