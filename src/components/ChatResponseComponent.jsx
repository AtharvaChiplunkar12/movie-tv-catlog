import React from 'react';
import { useNavigate } from "react-router-dom";
import { fetchMultiDetail } from './api';

const ChatResponseComponent = ({ responseData }) => {
  // Split the comma-separated string into an array of points
  const pointsArray = responseData.split(',').map(point => point.trim());

  const handleNavigate = async(point) => {
    const result = await fetchMultiDetail(point);
    console.log(result.results);

    }

  return (
    <div>
      <h3>Here are some recommendations:</h3>
      <ul>
        {pointsArray.map((point, index) => (
          <div key={index}>
            <li>{point}</li>
            <a onClick={() => handleNavigate(point)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Fetch Details
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChatResponseComponent;
