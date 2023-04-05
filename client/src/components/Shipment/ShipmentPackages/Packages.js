import React from 'react'

function Package({onePackage, id }) {
  return (
    <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-1 text-sm sm:pl-6">
            <div className="flex items-center">
                <div className="text-800">{onePackage.full_name}</div>
            </div>
        </td>
        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
                <div className="ml-0">
                    <div className="font-medium text-gray-900">{onePackage.phone_contact}</div>
                </div>
            </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{onePackage.email}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{onePackage.cost}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 pr-0 text-sm text-gray-500">
            {onePackage.paid_status ? <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Paid</span> : <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Not Paid</span> }
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <a href={`/shipmen/${id}`} className="text-indigo-600 hover:text-indigo-900">
            Edit
            </a>
        </td>
    </tr>
  )
}

export default Package
