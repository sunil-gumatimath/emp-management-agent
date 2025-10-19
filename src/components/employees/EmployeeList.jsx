import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const EmployeeList = ({
  employees,
  onEdit,
  onDelete,
  searchTerm
}) => {
  // Function to get department color class
  const getDepartmentClass = (department) => {
    const departmentClasses = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Sales': 'bg-yellow-100 text-yellow-800',
      'HR': 'bg-green-100 text-green-800',
      'Finance': 'bg-cyan-100 text-cyan-800',
      'Operations': 'bg-gray-100 text-gray-800',
    };
    return departmentClasses[department] || 'bg-gray-100 text-gray-800';
  };

  // Function to get status color class
  const getStatusClass = (status) => {
    const statusClasses = {
      'Active': 'bg-green-100 text-green-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Terminated': 'bg-red-100 text-red-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleDeleteClick = (id) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirm(null);
    onDelete(id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" role="region" aria-label="Employee List">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900" id="employee-list-heading">
          Employees
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({employees.length} {employees.length === 1 ? 'employee' : 'employees'})
          </span>
        </h2>
      </div>

      {employees.length === 0 ? (
        <div className="px-6 py-10 text-center" role="status" aria-live="polite">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'No employees match your search. Try a different search term.'
              : 'Get started by adding a new employee.'}
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" aria-labelledby="employee-list-heading">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th 
                  scope="col" 
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th 
                  scope="col" 
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th 
                  scope="col" 
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th 
                  scope="col" 
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Email
                </th>
                <th scope="col" className="relative px-5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-medium">
                        {getInitials(employee.name)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDepartmentClass(employee.department)}`}>
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.email}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => onEdit(employee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      {showDeleteConfirm === employee.id ? (
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => confirmDelete(employee.id)}
                            className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={cancelDelete}
                            className="text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(employee.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${employee.name}`}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
      hireDate: PropTypes.string,
      status: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchTerm: PropTypes.string
};

export default EmployeeList;
