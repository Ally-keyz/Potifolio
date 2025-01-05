import React from 'react'
import TabsWithVirtualizedData from '../components/reportTabs'
import img2 from "../assets/download.png";
import Modal from '../components/Modal';
import { useState } from 'react';

function Report() {
      const [modelOpen, setModelOpen] = useState(false);

  
      const closeModal2 = () => setModelOpen(false);
  return (
    <div>
                <div className="p-5 sm:w-[970px] w-full flex justify-end">
                    <div className="flex justify-evenly">
                        <div onClick={()=>setModelOpen(true)}  className="cursor-pointer  flex">
                         <p className='text-[12px] text-blue-500 mr-2 mt-1 font-semibold'>Create reports</p>
                        <img src={img2} className='w-7 h-7' alt="Download" />
                        </div>
                    </div>
                </div>
                <div className="">
                <div className="p-2">
                <div className=" w-[150px] h-[40px] flex justify-evenly items-center bg-gray-100 rounded-xl">
                <p className='text-[14px] text-blue-500 font-bold'>STOCK</p>
                <p className='w-[1.5px] h-4 bg-blue-500'></p>
                <p className='text-[14px] text-gray-700 font-bold'>Reports</p>
                </div>
            </div>
            <TabsWithVirtualizedData />
        </div>
        <Modal isOpen={modelOpen} onClose={closeModal2}>
                <div className="p-5 sm:p-0 w-full sm:w-[600px] h-[400px] bg-white rounded-md">
                    
                   
                </div>
            </Modal>
    </div>
  )
}

export default Report