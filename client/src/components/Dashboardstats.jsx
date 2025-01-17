import { 
    CurrencyDollarIcon, 
    ClockIcon, 
    ExclamationCircleIcon,
    CheckCircleIcon 
} from '@heroicons/react/24/outline'

const DashboardStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Outstanding */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Total Outstanding
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                    ₹{stats.totalOutstanding}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Invoices */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ClockIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Pending Invoices
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                    {stats.pendingCount}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overdue */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Overdue Invoices
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                    {stats.overdueCount}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Paid */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Paid This Month
                                </dt>
                                <dd className="text-lg font-medium text-gray-900">
                                    ${stats.paidThisMonth}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardStats ;