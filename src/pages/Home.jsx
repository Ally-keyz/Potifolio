import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';
import { ACCESS_TOKEN } from '../constants';



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
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="  ml-10 mx-auto mt-10">
<div className="sm:flex justify-between">
<div className="mr-5">
      <h2 className="text-black text-[12px] font-extrabold  mb-12">Published <span className='text-red-500'>projects</span></h2>
      <div className="w-[650px] h-[370px] overflow-auto scrollbar-custom justify-center items-center  border-y-8 bordered border-gray-800 rounded-md">
      <ul className="space-y-4 mt-1">
      {
  articles && articles.length > 0 ? 
  articles.map((article) => (
    <li 
      key={article._id} 
      className='w-full p-4 bg-gradient-to-r from-black to-gray-400 rounded-lg shadow-lg mb-4 hover:shadow-2xl transition-all duration-300 relative'
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

      {/* Delete Button */}
      <button 
        onClick={() => deleteArticle(article.id)} 
        className='absolute top-3 right-4 bg-red-400 text-white text-[10px] font-bold px-3 py-1 w-16 h-7 rounded-sm hover:bg-red-700 transition-all duration-200'
      >
        {isLoading ? <Spinner /> : 'Delete'}
      </button>
    </li>
  )) : <Spinner />
}
      </ul>
      </div>
      </div>
<div className="p-5 w-full h-[450px] overflow-auto bg-gray-100 rounded-sm">
  <div className="text-center text-red-500 font-bold text-[15px]"><span className='text-black'>Reviews on</span> your projects</div>
</div>
      </div>
        <div className="mt-20 mb-20">
      <h1 className="text-[14px] text-blue-950 mr-5 font-bold  mb-8">Start a <span className='text-red-500'>new project</span></h1>

      {/* Form to post article */}
      <form onSubmit={postArticle} className="space-y-4 w-[700px] mr-12">
        <div>
          <label className="block font-semibold mb-1 text-[10px]">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[10px]">Body</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-black to-indigo-900 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Post Note'}
        </button>

        {/* Success or error message */}
        {showNotification && (
                <Notification
                    message={notificationMessage}
                    duration={5000}  // Optional custom duration
                    onClose={handleNotificationClose}
                />
            )}
      </form>
      </div>

      {/* Display Articles */}

    </div>
  );
};

export default Home;