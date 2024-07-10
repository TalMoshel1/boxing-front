import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ApprovalLink = () => {
  const { lessonId } = useParams();
  const [isApproved, setIsApproved] = useState(false);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem('boxing')).token);
  let user = localStorage.getItem("boxing");
  // const {user} = JSON.parse(localStorage.getItem('boxing'))
  if (user) {
    user = JSON.parse(user);
  }

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const response = await fetch(
          `https://boxing-back-prod.onrender.com/api/lessons/approveLink/${lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: user.token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data) {
          console.log(data);
          return setIsApproved(data);
        }
      } catch (error) {
        setIsApproved({ message: "שיעור כבר קבוע במערכת בזמן זה" });
      }
    };

    if (lessonId) {
      sendPostRequest();
    }
  }, [lessonId, user]);

  if (isApproved) {
    console.log(isApproved);
    return <p>{isApproved.message}</p>;
  }

  return (
    <div>
      <p>Approving lesson...</p>
    </div>
  );
};

export default ApprovalLink;
