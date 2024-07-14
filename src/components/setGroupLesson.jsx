import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import styled from "styled-components";
import { RequestForm } from "./RequestPrivateLesson.jsx";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SetGroupLesson = () => {
  const data = useSelector((state) => state.calendar.groupModalData);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  let user = localStorage.getItem("boxing");
  if (user) {
    user = JSON.parse(user);
  }

  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: data.date.date,
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: newValue,
      };

      if (name === "repeatsWeekly" && newValue) {
        return {
          ...updatedFormData,
          startTime: "",
          endTime: "",
          repeatMonth: "1",
          isApproved: false,
        };
      }

      if (name === "repeatMonth" && prevFormData.repeatsWeekly) {
        const endDate = repeatEndDate(prevFormData.day, parseInt(value, 10));
        return {
          ...updatedFormData,
          repeatEndDate: endDate,
        };
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { repeatMonth, ...formDataToSend } = formData;

    const repeatEnd = repeatEndDate(formData.day, parseInt(repeatMonth, 10));

    try {
      const token = user.token;
      const response = await fetch("http://localhost:3000/api/lessons/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          ...formDataToSend,
          repeatEndDate: repeatEnd,
        }),
      });

      const data = await response.json();
      setMessage(data);
      handleCloseCreateGroupLesson();
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setMessage("error");
      handleCloseCreateGroupLesson();
    }
  };

  useEffect(() => {
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        day: data.date.date,
      }));
    }
  }, [data]);

  const handleCloseError = () => {
    setMessage("");
  };

  if (message.message) {
    return (
      <main>
        <div onClick={handleCloseError}>X</div>
        <strong>{message.message}</strong>
      </main>
    );
  }

  return (
    <RequestForm onSubmit={handleSubmit}>
      <FormItemContainer>
        <label>שם האימון:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormItemContainer>
      <FormItemContainer>
        <label>אימון חוזר</label>
        <input
          type="checkbox"
          name="repeatsWeekly"
          checked={formData.repeatsWeekly}
          onChange={handleChange}
        />
      </FormItemContainer>
      {formData.repeatsWeekly && (
        <FormItemContainer>
          <label>לכמה חודשים:</label>
          <select
            name="repeatMonth"
            value={formData.repeatMonth}
            onChange={handleChange}
            required={formData.repeatsWeekly}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </FormItemContainer>
      )}
      <FormItemContainer>
        <label>תיאור האימון:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormItemContainer>
      <FormItemContainer>
        <label>שעת התחלה (דוגמא: 08:00):</label>
        <input
          type="text"
          name="startTime"
          pattern="[0-9]{2}:[0-9]{2}"
          placeholder="HH:MM"
          value={formData.startTime}
          onChange={handleChange}
          required={formData.repeatsWeekly}
        />
      </FormItemContainer>
      <FormItemContainer>
        <label>שעת סיום (דוגמא: 09:00):</label>
        <input
          type="text"
          name="endTime"
          pattern="[0-9]{2}:[0-9]{2}"
          placeholder="HH:MM"
          value={formData.endTime}
          onChange={handleChange}
          required={formData.repeatsWeekly}
        />
      </FormItemContainer>

      <button type="submit">צור אימון</button>
    </RequestForm>
  );
};

export default SetGroupLesson;
