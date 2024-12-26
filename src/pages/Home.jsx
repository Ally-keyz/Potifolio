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


        {/* Success or error message */}
        {showNotification && (
                <Notification
                    message={notificationMessage}
                    duration={5000}  // Optional custom duration
                    onClose={handleNotificationClose}
                />
            )}
      
   
      {/* Display Articles */}

    </div>
  );
};

export default Home;