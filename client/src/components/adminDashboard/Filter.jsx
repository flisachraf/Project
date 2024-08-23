import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange, categories, dates }) => {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    onFilterChange({ category, date });
  }, [category, date]);

  return (
    <div className="mb-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-gray-700">Category</label>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-gray-700">Date</label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Dates</option>
            {dates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
