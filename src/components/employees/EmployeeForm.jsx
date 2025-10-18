import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const departments = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Operations', label: 'Operations' },
];

const statuses = [
  { value: 'Active', label: 'Active' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Terminated', label: 'Terminated' },
];

const EmployeeForm = ({ formData, onSubmit, onCancel, isEditing = false, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Position"
          id="position"
          name="position"
          value={formData.position || ''}
          onChange={handleInputChange}
          required
        />
        
        <Select
          label="Department"
          id="department"
          name="department"
          value={formData.department || 'Engineering'}
          onChange={handleInputChange}
          options={departments}
          required
        />
        
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Phone"
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone || ''}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Hire Date"
          id="hireDate"
          type="date"
          name="hireDate"
          value={formData.hireDate || ''}
          onChange={handleInputChange}
        />
        
        <Select
          label="Status"
          id="status"
          name="status"
          value={formData.status || 'Active'}
          onChange={handleInputChange}
          options={statuses}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
