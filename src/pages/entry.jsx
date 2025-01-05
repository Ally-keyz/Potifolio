import React, {useState} from 'react'
import icon1 from "../assets/edit.png"
import img2 from "../assets/download.png";
import Modal from '../components/Modal';
import i1 from "../assets/i1.png"
import AdvancedStockForm from '../components/stockForm';

function Entry() {
        const [modelOpen, setModelOpen] = useState(false);
        const closeModal2 = () => setModelOpen(false);
  return (
    <div>
        <div className="p-5 sm:w-[970px] w-full flex justify-end">
            <div className="flex justify-evenly">
                <div  className="cursor-pointer mr-4 flex">
                 <p className='text-[12px] text-blue-500 mr-2 mt-1 font-semibold'>Go to reports</p>
                <img src={img2} className='w-7 h-7' alt="Download" />
                </div>
                <div  className="cursor-pointer flex">
                 <p className='text-[12px] text-gray-700 mr-2 mt-1 font-semibold'>Download all entry</p>
                <img src={i1} className='w-7 h-7' alt="Download" />
                </div>
            </div>
        </div>
        <div className="">
        <div className="mb-5">
                <div className=" w-[150px] h-[40px] flex justify-evenly items-center bg-gray-100 rounded-md">
                <p className='text-[14px] text-blue-500 font-bold'>STOCK</p>
                <p className='w-[1.5px] h-4 bg-blue-500'></p>
                <p className='text-[14px] text-gray-700 font-bold'>Entry</p>
                </div>
            </div>
        
        <div className="w-full bg-white h-[650px] overflow-auto scrollbar-custom rounded-md border-gray-200 border shadow-md p-5 flex flex-col">
        <AdvancedStockForm />
        </div>
        </div>
        <div className="p-5">
            <div className="flex justify-center p-3">
                <p className='text-[17px] font-bold text-blue-500 '>Stock <span className='text-gray-600'>entry</span></p>
            </div>
            <div className="w-full h-[350px] bg-white overflow-auto scrollbar-custom rounded-md border-gray-200 border shadow-md p-5 flex flex-col">
              
            <div className="mt-2 flex rounded-md shadow-xl justify-center  w-full">
                        <table className="w-full  text-center text-[14px] text-gray-800 border-collapse">
                            <thead>
                                <tr className="border-b bg-blue-300 font-bold text-[13px] text-white">
                                    <th className="py-3 px-5">Products</th>
                                    <th className="py-3 px-5">Entry Date</th>
                                    <th className="py-3 px-5">Truck</th>
                                    <th className="py-3 px-5">W.BILL</th>
                                    <th className="py-3 px-5">Origin/Destination</th>
                                    <th className="py-3 px-5">Entry</th>
                                    <th className="py-3 px-5">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                </tbody>
                                </table>
                                </div>
         
            
    </div>
</div>

 </div>

  )
}

export default Entry