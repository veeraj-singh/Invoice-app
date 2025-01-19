import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceTable = ({ invoices = []}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredInvoices =
    activeTab === "All"
      ? invoices.filter((invoice) =>
          invoice.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : invoices
          .filter((invoice) =>
            activeTab === "Outstanding"
              ? invoice.status !== "paid"
              : invoice.status === "paid"
          )
          .filter((invoice) =>
            invoice.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase())
          );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="mt-8 flex flex-col">
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="flex space-x-4">
          {["All", "Outstanding", "Paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            aria-label="Search for a client"
          />
          <button
            onClick={() => navigate("/create-invoice")}
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
                    {["Client", "Due Date", "Total", "Status", "Preview"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {invoice.recipientEmail}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        ₹{invoice.amount}
                      </td>
                      <td
                        className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${
                          invoice.status === "paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {invoice.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-600 hover:underline">
                        <button
                          onClick={() =>
                            navigate(`/invoice-preview/${invoice._id}`)
                          }
                          aria-label="Preview Invoice"
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
                No invoices found.{" "}
                <button
                  onClick={() => navigate("/create-invoice")}
                  className="text-blue-600 hover:underline"
                >
                  Create your first invoice.
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          aria-label="Previous Page"
        >
          Prev
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
