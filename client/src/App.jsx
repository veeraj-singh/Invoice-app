import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/auth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateInvoicePage from './pages/CreateInvoice'
import InvoicePreviewPage from './pages/PreviewInvoice'
import EmailTemplateManagement from './pages/Templates'
import Navbar from './components/Navbar'

function PrivateRoute({ children }) {
    const { user, isLoading } = useAuth();
    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }
    if(!user){
        return <Navigate to="/login" />;
    }
    return children;
}

const AuthenticatedLayout = ({ children }) => {
    const { user, logout } = useAuth();
    return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userPic={user?.pic} onLogout={logout}/>
        {children}
      </div>
    );
  };

export default function App() {
    return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route
            path="/"
            element={
              <PrivateRoute>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/create-invoice"
            element={
              <PrivateRoute>
                <AuthenticatedLayout>
                  <CreateInvoicePage />
                </AuthenticatedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice-preview/:invoiceId"
            element={
              <PrivateRoute>
                <AuthenticatedLayout>
                  <InvoicePreviewPage />
                </AuthenticatedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/email-templates"
            element={
              <PrivateRoute>
                <AuthenticatedLayout>
                  <EmailTemplateManagement />
                </AuthenticatedLayout>
              </PrivateRoute>
            }
          />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
    );
}