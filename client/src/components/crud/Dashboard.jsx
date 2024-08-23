import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:8000/api/sponsor')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []); // Empty dependency array to run the effect once

  return (
    <div>{JSON.stringify(posts)}</div>
  );
}

export default Dashboard;
