import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Subscription.css';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subscriptions/getall');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const addSubscription = async () => {
    try {
      await axios.post('http://localhost:8000/api/subscriptions/add', { name, price, description });
      toast.success('Subscription added successfully', { position: 'top-right' });
      fetchData(); // Refresh subscription list after adding
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/subscriptions/delete/${id}`);
      toast.success('Subscription deleted successfully', { position: 'top-right' });
      setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  return (
    <div className='subscriptionTable'>
      <h1>Subscriptions</h1>
      <Link to={'/'} className='addButton'>
        Back to user
      </Link>
      <Link to={'/subscription-report'} className='addButton'>
        Check Subscription
      </Link>
      <div className='form'>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
        <button onClick={addSubscription}>Add</button>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={sub._id}>
              <td>{index + 1}</td>
              <td>{sub.name}</td>
              <td>{sub.price}</td>
              <td>{sub.description}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteSubscription(sub._id)}>
                  <i className='fa-solid fa-trash'></i>
                </button>
                <Link to={`/edit/${sub._id}`}>
                  <i className='fa-solid fa-pen-to-square'></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscription;
