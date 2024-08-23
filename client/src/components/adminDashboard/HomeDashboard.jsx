import React, { useState } from 'react'
import StatsCard from './StatsCard';
import TodayMoney from './TodayMoney';
import TodayUsers from './TodayUsers';
import NewClient from './NewClient';
import Sales from './Sales';
function HomeDashboard() {
    const [table, setTable] = useState(1);

    const handleStatsCardClick = (value) => {
      setTable(value);
    };
  return (
   
  
    <div className="text-center"  >
              Home Dashboard

              <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-5">
                <StatsCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"
                      ></path>
                    </svg>
                  }
                  bgColor="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40"
                  title="Today's Money"
                  amount="$53k"
                  percentage="+55%"
                  percentageColor="text-green-500"
                  onClick={() => handleStatsCardClick(1)}
                  isActive={table === 1}

                />
                <StatsCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  }
                  bgColor="bg-gradient-to-tr from-pink-600 to-pink-400 shadow-pink-500/40"
                  title="Today's Users"
                  amount="2,300"
                  percentage="+3%"
                  percentageColor="text-green-500"
                  onClick={() => handleStatsCardClick(2)}
                  isActive={table === 2}
                />
                <StatsCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                  }
                  bgColor="bg-gradient-to-tr from-green-600 to-green-400 shadow-green-500/40"
                  title="New Clients"
                  amount="3,462"
                  percentage="-2%"
                  percentageColor="text-red-500"
                  onClick={() => handleStatsCardClick(3)}
                  isActive={table === 3}
                />
                <StatsCard
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                  }
                  bgColor="bg-gradient-to-tr from-orange-600 to-orange-400 shadow-orange-500/40"
                  title="Sales"
                  amount="$103,430"
                  percentage="+5%"
                  percentageColor="text-green-500"
                  onClick={() => handleStatsCardClick(4)}
                  isActive={table === 4}
                
                />
              </div>
              {table === 1 && <div className='flex justify-center items-center h-full'><TodayMoney  /> </div>}
              {table === 2 && <div className='flex justify-center items-center h-full'><TodayUsers/></div>}
              {table === 3 && <div className='flex justify-center items-center h-full'><NewClient/></div>}
              {table === 4 && <div className='flex justify-center items-center h-full'><Sales/></div>}
            </div>
  )
}

export default HomeDashboard