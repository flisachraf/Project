import React from 'react'

function Sales() {
  return (
    <div><div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Dates
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Number of sales
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Totale Sales
            </th>
            
            
            
          </tr>
        </thead>

        <tbody className="bg-white">
          {/* Replace with your actual data and loop through it */}
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    10/05/2024
                  </div>
                 
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                20
              </div>
              
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
             $20,000
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-blue-500 whitespace-no-wrap border-b border-gray-200 cursor-pointer">
              View More
            </td>
           

           
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    10/05/2024
                  </div>
                 
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                20
              </div>
              
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
             $20,000
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-blue-500 whitespace-no-wrap border-b border-gray-200 cursor-pointer">
              View More
            </td>
           

           
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    10/05/2024
                  </div>
                 
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                20
              </div>
              
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
             $20,000
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-blue-500 whitespace-no-wrap border-b border-gray-200 cursor-pointer">
              View More
            </td>
           

           
          </tr>
          {/* Repeat the above structure for each row of data */}
        </tbody>
      </table>
    </div>
  </div></div>
  )
}

export default Sales