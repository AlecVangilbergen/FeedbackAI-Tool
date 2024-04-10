import React, { useState, useEffect } from 'react';
import { fetchAdmins } from '../services/adminService';


const AdminOverviewTable: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await fetchAdmins();
          setAdmins(data);
        } catch (error:any) {
          console.error(error.message);
        }
      };
  
      fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {admins.map((org) => (
            <tr key={org.id}>
              <td className="px-6 py-4 whitespace-nowrap">{org.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{org.username}</td>

              {/* Add more table cells for other organization properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOverviewTable;
