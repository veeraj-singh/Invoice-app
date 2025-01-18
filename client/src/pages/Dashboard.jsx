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
      const token = localStorage.getItem("token");
      try {
        const [statsResponse, invoicesResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/invoice/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5000/api/invoice", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-lg text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Manage your invoices and track key metrics
          </p>
        </header>
        <section className="mb-8">
          <DashboardStats stats={stats} />
        </section>
        <section>
          <InvoiceTable invoices={invoices} onSendReminder={handleSendReminder} />
        </section>
      </main>
  );
}
