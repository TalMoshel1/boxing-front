import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ApprovalLink = () => {
  const { lessonId } = useParams(); 
  const [isApproved, setIsApproved] = useState(false)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('boxing')).token);


  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/lessons/approveLink/${lessonId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data) {
            return setIsApproved(data)
        }
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };

    if (lessonId) {
      sendPostRequest();
    }
  }, [lessonId, token]);

  if (isApproved) {
    console.log(isApproved)
    return <p>{isApproved.message}</p>
  }

  return (
    <div>
      <p>Approving lesson...</p>
    </div>
  );
};

export default ApprovalLink;
