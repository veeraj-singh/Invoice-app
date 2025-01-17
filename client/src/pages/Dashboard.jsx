import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import DashboardStats from "../components/Dashboardstats";
import InvoiceTable from "../components/Invoicetable";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOutstanding: 0,
    pendingCount: 0,
    overdueCount: 0,
    paidThisMonth: 0,
  });
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token')
      try {
        const [statsResponse , invoicesResponse] = await Promise.all([
          axios.get("http://localhost:5000/invoice/stats",
            {headers: {
              'Authorization': `Bearer ${token}`
            }}
          ),
          axios.get("http://localhost:5000/invoice",
          {headers: {
            'Authorization': `Bearer ${token}`
          }}),
        ]);
        
        setStats(statsResponse.data);
        setInvoices(invoicesResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  const handleSendReminder = async (invoiceId) => {
    try {
      await axios.post(`/api/invoices/${invoiceId}/remind`);
      // Add success notification logic here
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <DashboardStats stats={stats} />
          <InvoiceTable invoices={invoices} onSendReminder={handleSendReminder} />
        </div>
      </main>
  );
}
