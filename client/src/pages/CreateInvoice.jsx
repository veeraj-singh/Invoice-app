import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios'

const CreateInvoicePage = () => {
    const { user, logout } = useAuth();
    const pic = user?.pic || "";
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState({
        amount: '',
        dueDate: '',
        recipientEmail: '',
    });
    const [notification, setNotification] = useState({
        show: false,
        type: '',
        message: ''
    });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formattedData = {
        ...invoiceData,
        amount: parseInt(invoiceData.amount),
        dueDate: new Date(invoiceData.dueDate).toISOString()
      };

      const response = await axios.post('http://localhost:5000/invoice', formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      if (response.data) {
        showNotification('success', 'Invoice created successfully!');
        setInvoiceData({
          amount: '',
          dueDate: '',
          recipientEmail: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred while creating the invoice';
      showNotification('error', errorMessage);
      console.error('Error creating invoice:', error);
    }
  }

  return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Invoice</h1>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
          {notification.show && (
            <div className={`absolute top-4 right-4 p-4 rounded-md flex items-center space-x-2 ${
              notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{notification.message}</span>
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="space-x-2">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-md">Email Invoice</button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={invoiceData.amount}
                      onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      value={invoiceData.recipientEmail}
                      onChange={(e) => setInvoiceData({...invoiceData, recipientEmail: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      placeholder="recipient@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateInvoicePage;