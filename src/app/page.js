import Image from "next/image";
import Link from "next/link";
import ClaimTimer from "./components/claimtimer";


export default function Home() {
  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly bg-cover bg-no-repeat " >
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[40vmax] max-w-[400px] aspect-[432/116] relative mt-[5%] ">
            <Image
              src="/image/elr_logo.png"
              alt="main logo"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative mt-[5%]">
          <a href="https://x.com/MSDG_official" target="_blank" rel="noopener noreferrer">
            <div className="w-[35vmax] max-w-[450px] flex items-center aspect-[478/62] relative active:scale-95 transition-transform duration-100 ">
              <Image
                src="/image/joinbtn.png"
                alt="main logo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <p className="w-full text-center text-[1.6vmax] sm:text-[2vmin] -rotate-0
        bg-gradient-to-r from-[#C09645] via-[#FFC977] to-[#C09645] bg-clip-text text-transparent ">To Earn Coin, Join in Twitter</p>
            </div>
          </a>
        </div>
        <ClaimTimer />
        
      </div>
    </div>
  );
}
