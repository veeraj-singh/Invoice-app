import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';

const InvoicePreviewPage = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/invoice/${invoiceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setInvoiceData(response.data);
      } catch (error) {
        showNotification('error', 'Error fetching invoice data');
      } finally {
        setLoading(false);
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

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/zapier/manual-reminder', { invoiceId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      showNotification('success', 'Invoice email sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      showNotification('error', 'Failed to send reminder');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="flex justify-center items-center py-8"><Loader className="h-8 w-8 animate-spin" /></div>;
  if (!invoiceData) return <div>Loading...</div>;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Invoice Preview</h1>
      </div>

      {notification.show && (
        <div className={`absolute top-4 right-4 p-4 rounded-md flex items-center space-x-2 ${notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="space-x-2">
              <button onClick={handleSendEmail} className="px-4 py-2 bg-gray-700 text-white rounded-md">
                {loading ? <Loader className="h-5 w-5 animate-spin" /> : 'Send Email'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <p>{invoiceData.amount.toLocaleString()}</p>
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
            <button onClick={() => navigate('/')} className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewPage;
