import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import { ACCESS_TOKEN } from '../constants';
import "../components/custom-scrollbar.css"
import arrow from "../assets/arrow.png";
import Modal from "../components/Modal.jsx"



const Home= () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState('');
  const[isLoading ,setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');


  const triggerNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
};

const handleNotificationClose = () => {
    setShowNotification(false);
};

  // Function to post article
  const postArticle = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);  // Retrieve the token
      const response = await fetch('http://localhost:8000/myapp/notes/create', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,  // Include token here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      });
  
      if (response.ok) {
        triggerNotification('Article posted successfully!');
        setTitle('');  // Reset form
        setBody('');
        fetchArticles();  // Fetch the updated list
      } else {
        triggerNotification('Failed to post article');
      }
    } catch (error) {
      triggerNotification('Error posting article');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch articles
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Assuming the token is stored in localStorage
      const response = await fetch('http://localhost:8000/myapp/notes/create', {
        headers: {
          "Authorization": `Bearer ${token}`,  // Add the token to headers
          "Content-Type": "application/json"
        }
      });
      const data = await response.json(); // Call json() to parse the response
      setArticles(data);
    } catch (error) {
      console.log('Failed to fetch articles:', error);
      triggerNotification('Failed to fetch articles');
    }
  };
// Function to delete an article
const deleteArticle = async (id) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token
      const response = await fetch(`http://localhost:8000/myapp/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          headers: {
            "Authorization": `Bearer ${token}`, // Corrected "Authorization"
            "Content-Type": "application/json"
        }
        },
      });
  
      if (response.ok) {
        triggerNotification('Article deleted successfully!');
        fetchArticles(); // Refresh the article list
      } else {
        const errorData = await response.json();
        triggerNotification(`Failed to delete article: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      triggerNotification(`Error deleting article: ${error.message}`);
    }finally{
        setIsLoading(false)
    }
  };
const [editingArticleId, setEditingArticleId] = useState(null); // Track if an article is being edited

// Function to handle edit
const editArticle = (article) => {
  setTitle(article.title);
  setBody(article.body);
  setEditingArticleId(article._id); // Store the ID of the article being edited
};

// Function to handle form submission for posting/updating
const handleSubmit = (event) => {
  event.preventDefault();
  if (editingArticleId) {
    // Update article if in edit mode
    updateArticle(editingArticleId, title, body);
  } else {
    // Post new article if not in edit mode
    postArticle(event);
  }
};


  // Fetch articles on component mount


  return (
    <div className=" scrollbar-custom  mx-auto mt-5">
           <div className="sm:flex justify-around w-full">
            <div className="sm:w-[450px] h-[320px] rounded-md border-gray-200 border shadow-md p-5">
            <div className="w-full h-[50px] border-b flex justify-around border-gray-300">
              <p className='text-[15px] text-gray-600 font-bold'>Current Stock</p>
              <div className="flex mt-[1px]">
              <p className='text-[13px] text-blue-400 font-semibold cursor-pointer  mr-1'>View details</p>
              <img src={arrow} className='w-5 h-5' alt="" />
              </div>
            </div>
            <div className="mt-2 flex rounded-md shadow-xl justify-center items-center w-full">
    <table className="w-full  mt-5 text-center text-[12px] text-gray-800 border-collapse">
      <thead>
        <tr className="border-b  bg-blue-100 border-gray-300">
          <th className="pb-2">Products name</th>
          <th className="pb-2">Quantity</th>
          <th className="pb-2">Entery Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
      </tbody>
    </table>
  </div>
            </div>
            <div className="sm:w-[450px] h-[320px] rounded-md border-gray-200 border shadow-md p-5 flex flex-col items-center">
  <div className="w-full h-[50px] flex justify-around border-b border-gray-300">
    <p className="text-[15px] text-gray-600 font-bold">Fumigation card</p>
    <div className="flex mt-[1px]">
      <p className="text-[13px] text-blue-400 font-semibold mr-1 cursor-pointer">View details</p>
      <img src={arrow} className="w-5 h-5" alt="" />
    </div>
  </div>
  <div className="mt-2 flex rounded-md shadow-xl justify-center items-center w-full">
    <table className="w-full  mt-5 text-center text-[12px] text-gray-800 border-collapse">
      <thead>
        <tr className="border-b  bg-blue-100 border-gray-300">
          <th className="pb-2">Products name</th>
          <th className="pb-2">Quantity</th>
          <th className="pb-2">Date fumugated</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


              

                 </div>
                 <div className="sm:flex justify-around w-full p-10">
                  <div className="sm:w-[430px] h-[150px] rounded-md border-gray-200 border shadow-md p-3">
                  <div className="w-full h-[20px] flex justify-around border-b border-gray-300">
    <p className="text-[13px] text-gray-600 font-bold">Entered products</p>
    <div className="flex mt-[1px]">
      <p className="text-[13px] text-blue-400 font-semibold mr-1 cursor-pointer">View details</p>
      <img src={arrow} className="w-5 h-5" alt="" />
    </div>
    
  </div>
  <div className="mt-2 flex rounded-md shadow-xl justify-center items-center w-full">
    <table className="w-full  mt-2 text-center text-[12px] text-gray-800 border-collapse">
      <thead>
        <tr className="border-b  bg-blue-100 border-gray-300">
          <th className="pb-2">Products name</th>
          <th className="pb-2">Quantity</th>
          <th className="pb-2">Date Entered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
      </tbody>
    </table>
  </div>
                  </div>
                  <div className="sm:w-[430px] h-[150px] rounded-md border-gray-200 border shadow-md p-3">
                  <div className="w-full h-[20px] flex justify-around border-b border-gray-300">
    <p className="text-[13px] text-gray-600 font-bold">Dispatched products</p>
    <div className="flex mt-[1px]">
      <p className="text-[13px] text-blue-400 font-semibold mr-1 cursor-pointer">View details</p>
      <img src={arrow} className="w-5 h-5" alt="" />
    </div>
    
  </div>
  <div className="mt-2 flex rounded-md shadow-xl justify-center items-center w-full">
    <table className="w-full  mt-2 text-center text-[12px] text-gray-800 border-collapse">
      <thead>
        <tr className="border-b  bg-blue-100 border-gray-300">
          <th className="pb-2">Products name</th>
          <th className="pb-2">Quantity</th>
          <th className="pb-2">Date Dispatched</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
        <tr className="border-t border-gray-300">
          <td className="py-2"></td>
          <td className="py-2"></td>
          <td className="py-2"></td>
        </tr>
      </tbody>
    </table>
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
      
   

    </div>
  );
};

export default Home;