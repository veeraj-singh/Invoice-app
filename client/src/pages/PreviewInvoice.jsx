import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth';
import axios from 'axios';

const InvoicePreviewPage = () => {
    const { user , logout } = useAuth()
    const pic = user?.pic
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState(null);
    const [notification, setNotification] = useState({
      show: false,
      type: '',
      message: ''
    });

  useEffect(() => {
    const fetchInvoice = async () => {
        const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`http://localhost:5000/invoice/${invoiceId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSendEmail = () => {
    showNotification('success', 'Invoice email sent successfully!');
    // Add email sending logic here
  };

  const handleScheduleReminder = () => {
    showNotification('success', 'Reminder scheduled successfully!');
    // Add reminder scheduling logic here
  };

  if (!invoiceData) return <div>Loading...</div>;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Invoice Preview</h1>
      </div>

      {notification.show && (
        <div className={`absolute top-4 right-4 p-4 rounded-md flex items-center space-x-2 ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="space-x-2">
              <button
                onClick={() => showNotification('Reminder scheduled', 'success')}
                className="px-4 py-2 bg-gray-100 rounded-md"
              >
                Schedule Reminders
              </button>
              <button
                onClick={() => showNotification('Email sent successfully', 'success')}
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
              >
                Send Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <p>{invoiceData.amount}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <p>{new Date(invoiceData.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                <p>{invoiceData.recipientEmail}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Reminders & Follow-Ups</h3>
            {invoiceData.remindersSent.length > 0 ? (
              <ul className="space-y-4">
                {invoiceData.remindersSent.map((reminder, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <div>
                      <strong>Reminder Sent:</strong> {new Date(reminder.date).toLocaleString()}
                    </div>
                    <div>
                      <strong>Status:</strong> {reminder.status === 'sent' ? 'Sent' : 'Failed'}
                    </div>
                    {reminder.followUp && (
                      <>
                        <div>
                          <strong>Follow-Up Sent:</strong> {new Date(reminder.followUp.date).toLocaleString()}
                        </div>
                        <div>
                          <strong>Response:</strong> {reminder.followUp.recipientResponse}
                        </div>
                        <div>
                          <strong>Action Taken:</strong> {reminder.followUp.actionTaken || 'N/A'}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reminders or follow-ups have been sent yet.</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-8">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewPage;
