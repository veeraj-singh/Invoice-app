import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceTable = ({ invoices = [], onSendReminder }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const filteredInvoices =
    activeTab === "All"
      ? invoices.filter((invoice) =>
          invoice.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : invoices.filter((invoice) =>
            activeTab === "Outstanding"
              ? invoice.status !== "paid"
              : invoice.status === "paid"
          )
          .filter((invoice) =>
            invoice.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase())
          );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {["All", "Outstanding", "Paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === tab
                  ? "bg-gray-200 text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a client..."
            className="px-4 py-2 text-sm border border-gray-300 rounded-md"
          />
          <button
            onClick={() => navigate('/create-invoice')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {filteredInvoices.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Client
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Due Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.recipientEmail}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ₹{invoice.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {invoice.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => navigate(`/invoice-preview/${invoice._id}`)}
                          className="text-blue-600 hover:underline"
                        >
                          Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-gray-500">
                You have no invoices,{" "}
                <a href="#" className="text-blue-600 underline">
                  add your first invoice today.
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
          Prev
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
