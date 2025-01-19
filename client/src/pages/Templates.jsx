import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle , AlertCircle} from 'lucide-react'

const EmailTemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [editableTemplate, setEditableTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('view');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/email-templates`);
        setTemplates(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    fetchTemplates();
  }, []);

  const handleEditTemplate = (template) => {
    setEditableTemplate({ ...template });
    setActiveTab('edit');
  };

  const handleSaveTemplate = async () => {
    if (editableTemplate) {
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/email-templates/${editableTemplate.type}`, {
            subject: editableTemplate.subject,
            body: editableTemplate.body,
          });
          setNotification({ show: true, message: 'Template updated successfully!', type: 'success' });
          const updatedTemplate = response.data;  
          setTemplates((prevTemplates) => {
            return prevTemplates.map((template) =>
              template.type === updatedTemplate.type ? updatedTemplate : template
            );
          });
          setActiveTab('view');
      } catch (error) {
        setNotification({ show: true, message: 'Failed to update template!', type: 'error' });
        console.error('Error updating template:', error);
      }
    }
  };

  return (
    <div className="p-6">
      {notification.show && (
        <div
            className={`absolute bottom-4 right-4 p-4 rounded-md flex items-center space-x-2 ${
            notification.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
        >
            {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
            ) : (
            <AlertCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
        </div>
        )}

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Email Template Management</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('view')}
        >
          View Templates
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Template
        </button>
      </div>

      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.type} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-700">{template.type}</h3>
              <p className="text-gray-600 mt-2"><strong>Subject:</strong> {template.subject}</p>
              <p className="text-gray-600 mt-2"><strong>Body:</strong> {template.body}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'edit' && editableTemplate && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Template: {editableTemplate.type}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={editableTemplate.subject}
              onChange={(e) => setEditableTemplate({ ...editableTemplate, subject: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
            <textarea
              value={editableTemplate.body}
              onChange={(e) => setEditableTemplate({ ...editableTemplate, body: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="6"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSaveTemplate}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManagement;
