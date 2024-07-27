import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { openWhatsApp } from '../functions/sendWhatsApp';

const ApprovalLink = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isApproved, setIsApproved] = useState(false);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));

  useEffect(() => {
    const authenticateRequest = async () => {
      try {
        const token = JSON.parse(boxing)?.token;
        const response = await fetch(
          "https://boxing-back.onrender.com/api/auth/verify-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.message !== "Token is valid") {
          // Navigate to Sign In page
          navigate("/signin", { state: { from: location } });
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/signin", { state: { from: location } });
      }
    };

    authenticateRequest();
  }, [boxing, navigate, location]);

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const token = JSON.parse(boxing)?.token;
        const response = await fetch(
          `https://boxing-back.onrender.com/api/lessons/approveLink/${lessonId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
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
          openWhatsApp(data.lesson, '0522233573');
          return setIsApproved(data);
        }
      } catch (error) {
        setIsApproved({ message: "שיעור כבר קבוע במערכת בזמן זה" });
      }
    };

    if (lessonId && JSON.parse(boxing)?.token) {
      sendPostRequest();
    }
  }, [lessonId, boxing]);

  if (isApproved) {
    return <p>{isApproved.message}</p>;
  }

  return (
    <div>
      <p>Approving lesson...</p>
    </div>
  );
};

export default ApprovalLink;
