import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import '@fontsource-variable/inter/wght.css';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeeList from './components/employees/EmployeeList';
import EmployeeForm from './components/employees/EmployeeForm';
import Modal from './components/common/Modal';
import Button from './components/common/Button'; // Import Button component

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <h2 className="font-bold">Something went wrong</h2>
          <p className="text-sm">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-sm"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sample employee data
const initialEmployees = [
  { 
    id: 1, 
    name: 'John Doe', 
    position: 'Frontend Developer', 
    department: 'Engineering', 
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    hireDate: '2022-01-15',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    position: 'UX Designer', 
    department: 'Design', 
    email: 'jane.smith@example.com',
    phone: '(123) 456-7891',
    hireDate: '2021-11-05',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    position: 'Backend Developer', 
    department: 'Engineering', 
    email: 'robert.j@example.com',
    phone: '(123) 456-7892',
    hireDate: '2022-03-20',
    status: 'On Leave'
  },
  { 
    id: 4, 
    name: 'Emily Chen', 
    position: 'Product Manager', 
    department: 'Operations', 
    email: 'emily.chen@example.com',
    phone: '(123) 456-7893',
    hireDate: '2020-09-12',
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'Carlos Martinez', 
    position: 'Marketing Specialist', 
    department: 'Marketing', 
    email: 'carlos.m@example.com',
    phone: '(123) 456-7894',
    hireDate: '2019-06-18',
    status: 'Active'
  },
  { 
    id: 6, 
    name: 'Aisha Patel', 
    position: 'HR Coordinator', 
    department: 'HR', 
    email: 'aisha.patel@example.com',
    phone: '(123) 456-7895',
    hireDate: '2023-02-07',
    status: 'Probation'
  },
];

const initialFormState = {
  name: '',
  position: '',
  department: 'Engineering',
  email: '',
  phone: '',
  hireDate: '',
  status: 'Active'
};

const AppContent = () => {
  const [employees, setEmployees] = useState(() => {
    try {
      const savedEmployees = localStorage.getItem('employees');
      return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
    } catch (error) {
      console.error('Failed to parse employees from localStorage', error);
      return initialEmployees;
    }
  });
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(employee => employee.status === 'Active').length;
  const onLeaveEmployees = employees.filter(employee => employee.status === 'On Leave').length;
  const probationEmployees = employees.filter(employee => employee.status === 'Probation').length;
  const departmentCount = new Set(employees.map(employee => employee.department)).size;

  // Save employees to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('employees', JSON.stringify(employees));
    } catch (error) {
      console.error('Failed to save employees to localStorage', error);
      setError('Failed to save employee data. Please try again.');
    }
  }, [employees]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleFormChange = useCallback((newFormData) => {
    setFormData(prev => ({
      ...prev,
      ...newFormData
    }));
  }, []);

  const validateEmployee = (employeeData) => {
    if (!employeeData.name?.trim()) {
      throw new Error('Employee name is required');
    }
    if (!employeeData.email?.trim()) {
      throw new Error('Email is required');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeData.email)) {
      throw new Error('Please enter a valid email address');
    }
    return true;
  };

  const handleAddEmployee = useCallback((employeeData) => {
    try {
      validateEmployee(employeeData);
      
      const newEmployee = {
        ...employeeData,
        id: Date.now(),
        hireDate: employeeData.hireDate || new Date().toISOString().split('T')[0]
      };
      
      setEmployees(prev => [...prev, newEmployee]);
      setFormData(initialFormState);
      setIsAddModalOpen(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleEditEmployee = useCallback((employeeData) => {
    try {
      if (!currentEmployee) return;
      
      validateEmployee(employeeData);
      
      setEmployees(prev => 
        prev.map(emp => 
          emp.id === currentEmployee.id 
            ? { ...employeeData, id: currentEmployee.id }
            : emp
        )
      );
      
      setIsEditModalOpen(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [currentEmployee]);

  const handleEditClick = useCallback((employee) => {
    setCurrentEmployee(employee);
    setFormData({ ...employee });
    setIsEditModalOpen(true);
    setError(null);
  }, []);

  const handleDeleteEmployee = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setError(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 border-r border-gray-200 bg-white shadow-lg flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
            <nav className="mt-5 space-y-2.5">
              <a href="#dashboard" className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                Dashboard
                <span className="text-xs text-gray-400">Overview</span>
              </a>
              <a href="#employees" className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                Employees
                <span className="text-xs text-gray-400">Directory</span>
              </a>
              <a href="#footer" className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                Support
                <span className="text-xs text-gray-400">Helpdesk</span>
              </a>
            </nav>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</p>
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormState);
                setIsAddModalOpen(true);
                setError(null);
              }}
              className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              + Add Employee
            </button>
            <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700">
              Keep your roster updated by reviewing new hires weekly.
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="px-4 md:px-6 lg:px-8 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold text-gray-900">Employee Hub</p>
              <p className="text-sm text-gray-500">Track workforce momentum and plan ahead</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="rounded-lg bg-gray-50 px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
                  <p className="text-lg font-semibold text-gray-900">{totalEmployees}</p>
                </div>
                <div className="rounded-lg bg-green-50 px-4 py-2">
                  <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Active</p>
                  <p className="text-lg font-semibold text-green-700">{activeEmployees}</p>
                </div>
                <div className="rounded-lg bg-yellow-50 px-4 py-2">
                  <p className="text-xs font-medium text-yellow-700 uppercase tracking-wide">On Leave</p>
                  <p className="text-lg font-semibold text-yellow-700">{onLeaveEmployees}</p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-xs text-gray-400">Updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>
         <main className="flex-1 overflow-y-auto py-6 px-6">
          <div className="w-full space-y-5">

            <section id="dashboard" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{totalEmployees}</p>
                <p className="mt-1 text-xs text-gray-500">Across {departmentCount} departments</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="mt-2 text-3xl font-semibold text-green-600">{activeEmployees}</p>
                <p className="mt-1 text-xs text-gray-500">Currently engaged team members</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-500">On Leave</p>
                <p className="mt-2 text-3xl font-semibold text-yellow-600">{onLeaveEmployees}</p>
                <p className="mt-1 text-xs text-gray-500">Approved leave in progress</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-sm font-medium text-gray-500">Probation</p>
                <p className="mt-2 text-3xl font-semibold text-blue-600">{probationEmployees}</p>
                <p className="mt-1 text-xs text-gray-500">New hires under review</p>
              </div>
            </section>

            {/* Error Display */}
            {error && (
              <div 
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:flex-1 relative">
                  <input
                    id="employee-search"
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{ backgroundColor: 'white' }}
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search employees"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label="Clear search"
                    >
                      <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setFormData(initialFormState);
                      setIsAddModalOpen(true);
                      setError(null);
                    }}
                    className="w-full"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                    Add Employee
                  </Button>
                </div>
              </div>
               {searchTerm && (
                 <div className="mt-3 text-sm text-gray-600">
                   <span className="font-medium">{filteredEmployees.length}</span> employee{filteredEmployees.length !== 1 ? 's' : ''} found
                   {filteredEmployees.length === 0 && searchTerm && (
                     <span className="ml-2 text-gray-500">• Try a different search term</span>
                   )}
                 </div>
               )}
             </div>
            <EmployeeList
              employees={filteredEmployees}
              onEdit={handleEditClick}
              onDelete={handleDeleteEmployee}
              searchTerm={searchTerm}
            />
          </div>
        </main>
       </div>

       {/* Add Employee Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Employee">
        <EmployeeForm 
          formData={formData} 
          onSubmit={handleAddEmployee} 
          onChange={handleFormChange} 
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Employee Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Employee">
        <EmployeeForm 
          formData={formData} 
          onSubmit={handleEditEmployee} 
          onChange={handleFormChange} 
          onCancel={() => setIsEditModalOpen(false)}
          isEditing={true}
        />
      </Modal>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
