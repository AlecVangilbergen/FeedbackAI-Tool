import React, { useState, useEffect } from 'react';
import { fetchOrganizations, deleteOrganisation } from '../../services/organisationService';


const OrganizationsOverviewTable: React.FC = () => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const clickDelete = (id: number) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this organization?');

    if (confirmDelete) {
      // User clicked OK, proceed with deletion
      deleteOrganisation(id)
        .then(() => {
          const newOrganizations = organizations.filter((org) => org.id !== id);
          setOrganizations(newOrganizations);
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    } else {
      // User clicked Cancel, do nothing
      console.log('Deletion cancelled by user');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrganizations();
        setOrganizations(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-light-neutral dark:bg-dark-neutral">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Organizations Overview</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-light-neutral dark:bg-dark-neutral">
        <thead className="bg-base bg-light-neutral dark:bg-dark-neutral text-light-text dark:text-dark-text">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
              Delete
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200 bg-light-neutral dark:bg-dark-neutral">
          {organizations.map((org) => (
            <tr key={org.id}>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{org.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{org.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                <button onClick={() => clickDelete(org.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>

              {/* Add more table cells for other organization properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationsOverviewTable;
