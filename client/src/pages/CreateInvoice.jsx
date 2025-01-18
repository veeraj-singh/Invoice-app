import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';

const CreateInvoicePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    amount: '',
    dueDate: '',
    recipientEmail: '',
  });
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (parseFloat(invoiceData.amount) <= 0) {
      showNotification('error', 'Amount must be greater than zero.');
      return;
    }

    if (new Date(invoiceData.dueDate) < new Date()) {
      showNotification('error', 'Due date cannot be in the past.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formattedData = {
        ...invoiceData,
        amount: parseInt(invoiceData.amount),
        dueDate: new Date(invoiceData.dueDate).toISOString(),
      };

      const response = await axios.post('http://localhost:5000/api/invoice', formattedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        showNotification('success', 'Invoice created successfully!');
        setInvoiceData({ amount: '', dueDate: '', recipientEmail: '' });
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'An error occurred while creating the invoice.';
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Invoice</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 relative">
        {notification.show && (
          <div
            className={`absolute top-4 right-4 flex items-center space-x-2 px-4 py-3 rounded-md ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{notification.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={invoiceData.amount}
                onChange={(e) => setInvoiceData({ ...invoiceData, amount: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
              <input
                type="email"
                value={invoiceData.recipientEmail}
                onChange={(e) => setInvoiceData({ ...invoiceData, recipientEmail: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="recipient@example.com"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
