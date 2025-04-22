'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import Alert from '@mui/material/Alert';

export default function Balance() {
  const [pop, setPop] = useState(false);
  const [n2o, setN2O] = useState(0);
  const [tickets, setTickets] = useState(0);


  useEffect(() => {
    // 초기 n2o 값 불러오기
    const storedN2O = localStorage.getItem("n2o");
    if (storedN2O !== null) {
      setN2O(Number(storedN2O));
    }
    // 초기 티켓 값 불러오기
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets !== null) {
      setTickets(Number(storedTickets));
    }
  }, []);

  const getTicket = (ticketNum, price) => {
    //티켓 가격보다 n2o가 작으면 팝업
    // console.log(n2o);
    if (n2o < Number(price)) {
      setPop(true);
      setTimeout(() => setPop(false), 1500); // 1.5초 후 복사 메시지 초기화
      return;
    }
    //가격이 성립하면 n2o 가격만큼 줄이고, 티켓 갯수만큼 늘어남(로컬스토리지, state 모두 업뎃)
    setN2O((prevN2O) => {
      const newN2O = prevN2O - price;
      if (newN2O < 0) {
        return prevN2O;
      }
      localStorage.setItem("n2o", newN2O);  // 로컬스토리지 업데이트
      return newN2O;  // 상태 업데이트
    });

    setTickets((prevTickets) => {
      const newTickets = prevTickets + ticketNum;
      localStorage.setItem("tickets", newTickets);  // 로컬스토리지 업데이트
      return newTickets;  // 상태 업데이트
    });

  }

  // 상태가 변경된 후에 로컬스토리지와 이벤트 디스패치 처리
  useEffect(() => {
    // tickets 상태가 변경될 때만 실행
    window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT)); // footer에 ticket 값 변경 알림
  }, [tickets]);  // tickets 상태가 변경될 때만 실행

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className=" w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-balanceBg w-full h-full max-w-[500px] relative flex flex-col justify-between " >
          <div className=" w-full h-[50%] flex flex-col justify-center items-center relative">
            <div className="w-full aspect-[536/444] relative ">
              <Image
                src="/image/elr_balance_main.png"
                alt="main logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className=" flex justify-center w-full h-[15%] ">
              <div className=" w-[50%] relative flex justify-evenly items-center ">
                <div className="w-[20%] aspect-[70/68] relative ">
                  <Image
                    src="/image/elr_ticket.png"
                    alt="main logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="mt-[2px]  text-white text-[3vmax] sm:text-[2.2vmin] [-webkit-text-stroke:0.8px_#9F7945]">{tickets}</p>
              </div>
              <div className=" w-[50%] flex justify-evenly items-center relative">
                <p className="mt-[2px]  text-white text-[3vmax] sm:text-[2.2vmin] [-webkit-text-stroke:0.8px_#9F7945]">{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                <div className="w-[20%] aspect-[70/68] relative ">
                  <Image
                    src="/image/elr_elr.png"
                    alt="main logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="w-full text-center text-[5vmax] sm:text-[5vmin] -rotate-2
        bg-gradient-to-r from-[#F9BC2F] via-[#FED9A5] to-[#EB9F15] bg-clip-text text-transparent [-webkit-text-stroke:1px_black] ">Get Magic Water</p>
          <div className=" w-full py-[1vmin] flex gap-3 flex-col items-center justify-center">
            <div onClick={() => getTicket(1, 500)} className=" w-[36vmax] sm:w-[40vmin] aspect-[486/132] relative active:scale-90 transition-transform duration-200 ">
              <Image
                src="/image/elr1.png"
                alt="meatIcon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div onClick={() => getTicket(3, 1300)} className="w-[36vmax] sm:w-[40vmin] aspect-[486/132] relative active:scale-90 transition-transform duration-200 ">
              <Image
                src="/image/elr3.png"
                alt="meatIcon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div onClick={() => getTicket(5, 2000)} className="w-[36vmax] sm:w-[40vmin] aspect-[486/132] relative active:scale-90 transition-transform duration-200 ">
              <Image
                src="/image/elr5.png"
                alt="meatIcon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          {pop && (
            <div className=" absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">Need more ELR.</Alert></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
