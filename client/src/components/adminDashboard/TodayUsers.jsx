import React from 'react'

function TodayUsers() {
  return (
      <div><div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Status
            </th>
            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
             Services
            </th>
            
            
          </tr>
        </thead>

        <tbody className="bg-white">
          {/* Replace with your actual data and loop through it */}
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>

                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    John Doe
                  </div>
                  <div className="text-sm leading-5 text-left text-gray-500">
                    john@example.com
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                Software Engineer
              </div>
              <div className="text-sm leading-5 text-left text-gray-500">Web dev</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                Offline
              </span>
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Owner
            </td>
           

           
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>

                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    John Doe
                  </div>
                  <div className="text-sm leading-5 text-left text-gray-500">
                    john@example.com
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                Software Engineer
              </div>
              <div className="text-sm leading-5 text-left text-gray-500">Web dev</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                Online
              </span>
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Owner
            </td>
           

           
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>

                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-left text-gray-900">
                    John Doe
                  </div>
                  <div className="text-sm leading-5 text-left text-gray-500">
                    john@example.com
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-left text-gray-900">
                Software Engineer
              </div>
              <div className="text-sm leading-5 text-left text-gray-500">Web dev</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b text-left border-gray-200">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
              Online
              </span>
            </td>

            <td className="px-6 py-4 text-sm leading-5 text-left text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Owner
            </td>
           

           
          </tr>
          {/* Repeat the above structure for each row of data */}
        </tbody>
      </table>
    </div>
  </div></div>
  )
}

export default TodayUsers