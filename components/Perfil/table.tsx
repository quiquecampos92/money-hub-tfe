import { useState, useEffect } from 'react';
import { getNameAuth, getIdAuth, getEmailAuth } from '@/shared/middlewares/data';

export default function UserTable() {
  const name = getNameAuth();
  const id = getIdAuth();
  const email = getEmailAuth();

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Detalles del Usuario</h2>
      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong className="font-semibold text-gray-700">ID:</strong> 
          <span className="ml-2 text-[#00A2DB]">{id}</span>
        </li>
        <li className="mb-2">
          <strong className="font-semibold text-gray-700">Nombre:</strong> 
          <span className="ml-2 text-[#EB8833]">{name}</span>
        </li>
        <li className="mb-2">
          <strong className="font-semibold text-gray-700">Email:</strong> 
          <span className="ml-2 text-[#F5C746]">{email}</span>
        </li>
      </ul>
    </div>
  );
}
