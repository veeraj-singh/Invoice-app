import {
    CurrencyDollarIcon,
    ClockIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
  } from "@heroicons/react/24/outline";
  
  const DashboardStats = ({ stats }) => {
    const formatCurrency = (amount) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
  
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon
                  className="h-6 w-6 text-blue-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Outstanding
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {formatCurrency(stats.totalOutstanding)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Invoices
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {stats.pendingCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon
                  className="h-6 w-6 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overdue Invoices
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {stats.overdueCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Paid This Month
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {formatCurrency(stats.paidThisMonth)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardStats;
  