import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import { ACCESS_TOKEN } from '../constants';
import Navbar from './Navbar'
import '../components/custom-scrollbar.css'
import Modal from '../components/Modal';
import'../components/ripple.css'
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';
function Projects() {
    const[isLoading ,setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const options = ['Investor', 'Collaborator'];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected ,setSelected] = useState('');
    const[nameMail,setNameMail] = useState('');
    const[usernam,setUsernam] = useState('')

    const openModal = () =>{
        setIsModalOpen(true)
        setSelected
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(()=>{
        fetchArticles();
    },[])

    const triggerNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };
    
    const handleNotificationClose = () => {
        setShowNotification(false);
    };
    const fetchArticles = async () => {
        try {
          const token = localStorage.getItem(ACCESS_TOKEN); // Assuming the token is stored in localStorage
          const response = await fetch('http://localhost:8000/myapp/view/project', {
            headers: {
                "Authorization": `Bearer ${token}`,  // Include token in headers
                "Content-Type": "application/json",
              },
          });
          if(response.status === 401 ){
            triggerNotification('There was an error fetching articles');
            console.log(response.data)
          }else{
            triggerNotification('articles fetched successfully');
          }
          const data = await response.json(); // Call json() to parse the response
          setArticles(data);
        } catch (error) {
          console.log('Failed to fetch articles:', error);
          triggerNotification('Failed to fetch articles');
        }
      };
  return (
    <div>
        <Navbar />
        <div className="w-full h-[585px] bg-gray-900 flex items-center">
            <div className="sm:flex justify-between ml-28 mt-20">
                <div className="bg-gradient-to-r from-black to-gray-800 w-[650px] overflow-auto scrollbar-custom rounded-sm h-[460px]">
                <div className=" mt-3 text-center mb-5 text-[13px] text-white font-extrabold">Different user's <span className='text-red-500'>projects</span> </div>
                
      <ul className="space-y-4 flex justify-center ">
        <div className="">
      {
  articles && articles.length > 0 ? 
  articles.map((article) => (
    <li 
      key={article._id} 
      className='w-[550px] p-4 bg-gradient-to-r from-black to-gray-400 rounded-md shadow-lg mb-4 hover:shadow-2xl transition-all duration-300 relative'
    >
      <h3 className='text-[15px] font-bold text-white mb-2 truncate'>
        {article.title}
      </h3>
      <p className='text-[10px] font-semibold text-gray-200 leading-snug'>
      <span className='text-red-500'>Description:</span>{article.body}
      </p>
      <p className='text-[10px] font-semibold mt-2 text-gray-200 leading-snug'>
        <span className='text-red-500'>Started at:</span> {article.created_at}
      </p>
      <p className='text-[10px] font-semibold mt-2 text-gray-200 leading-snug'>
        <span className='text-red-500'>Author:</span> {article.author.username}
      </p>
      <button 
        
        className='absolute top-20 right-4  bg-green-500 text-white text-[10px] font-bold px-3 py-1 w-16 h-7 rounded-sm hover:bg-green-700 transition-all duration-200'
      >
         Like
      </button>
    </li>
  )) : <Spinner />
}
</div>
      </ul>
     
                </div>
                <div className="bg-gradient-to-r from-black to-gray-700 w-[350px] overflow-auto scrollbar-custom ml-20 rounded-sm h-[340px]">
                <div className=" mt-3 text-center mb-10 text-[13px] text-white font-extrabold">Surpport  <span className='text-red-500'>projects</span> </div>
                <div className="flex justify-center">
                <div className="">
                {
  articles && articles.length > 0 ? 
  articles.map((article) => (
    <li 
      key={article._id} 
      onClick={openModal}
      className='w-[300px] h-[50px] p-3 button list-none bg-gradient-to-r from-black to-red-300 cursor-pointer hover:translate-y-[-5px]  rounded-md shadow-lg mb-4 hover:shadow-2xl transition-all duration-300 relative'
    >
      <h3 className='text-[15px] font-bold text-white mb-2 truncate'>
        {article.title}
      </h3>
    </li>
  )) : <Spinner />
}
</div>
                </div>
                </div>
            </div>
        </div>
                {/* Success or error message */}
                {showNotification && (
                <Notification
                    message={notificationMessage}
                    duration={5000}  // Optional custom duration
                    onClose={handleNotificationClose}
                />
            )}

<Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-[420px] h-72 bg-gradient-to-r from-black to-gray-400 rounded-md">
        <div className="flex justify-center align-middle p-5">
            <div className="">
                <div className="text-center text-[15px] text-red-500 font-bold mb-10"><span className='text-white'>Explore more</span> in this Project</div>
        <CustomInput options={options} onChange={(e)=>setSelectedOption(e.target.value)} />
        <input
    type="text"
    value={nameMail}
    onChange={(e) => setNameMail(e.target.value)}
    className="block  w-full px-12 py-2 text-[10px] text-red-500 shadow-md rounded-md mt-2  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Email "
  />
       <input
    type='text'
    value={usernam}
    onChange={(e) => setUsernam(e.target.value)}
    className="block  w-full px-12 py-2 text-[10px] text-red-500 shadow-md rounded-md mt-2  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Full name"
  />
    <Link className="transition-colors duration-500 hover:bg-white">
   <div  className="text-center text-white bg-gradient-to-l from-black to-gray-700 pt-1 mt-5    text-[11px] font-semibold rounded cursor-pointer w-52 h-7 ">
   Send request
   </div>  
        </Link>
  </div>
            </div>
            </div>
      </Modal>
    </div>
  )
}

export default Projects