import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RequestForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  direction: rtl;
  width: 100%;
  max-width: 30vw;
  text-align: center;

  label {
    width: 100%;
    text-align: center;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
`;

const Main = styled.main`
  margin-top: 10svh;
`;

const SetGroupLesson = () => {
  const dispatch = useDispatch();

  const [day, setDay] = useState("");
  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: "",
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });
  const [message, setMessage] = useState("");

  const [datePlaceholder, setDatePlaceholder] = useState("בחר תאריך"); // Default placeholder

  const [cantIn, setCantIn] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);

  // Handle form data change
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

  useEffect(() => {
    console.log("day: ", new Date(day));
  }, [day]);

  // Handle date input change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDay(selectedDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: selectedDate,
    }));
    setDatePlaceholder(
      selectedDate ? `תאריך שנבחר: ${selectedDate}` : "בחר תאריך"
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { repeatMonth, ...formDataToSend } = formData;

    const repeatEnd = repeatEndDate(formData.day, parseInt(repeatMonth, 10));

    try {
      const token = localStorage.getItem("boxing");
      const response = await fetch(
        "https://boxing-back.onrender.com/api/lessons/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            ...formDataToSend,
            repeatEndDate: repeatEnd,
          }),
        }
      );

      const data = await response.json();
      console.log("group data: ", data);
      setMessage(data.message || "Success");
      handleCloseCreateGroupLesson();
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setMessage("Error");
      handleCloseCreateGroupLesson();
    }
  };

  // Handle modal close
  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleCloseError = () => {
    setMessage("");
  };

  // Update formData when day changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day,
    }));
  }, [day]);

  if (message) {
    return (
      <Main>
        <div onClick={handleCloseError}>X</div>
        <strong>{message}</strong>
      </Main>
    );
  }

  return (
    <RequestForm onSubmit={handleSubmit}>
      <FormItemContainer>
        <label>תאריך האימון:</label>
        <input
          type="date"
          name="day"
          value={formData.day}
          onChange={handleDateChange}
          min={formatDateToYYYYMMDD(new Date())}
          placeholder={datePlaceholder}
          required
        />
      </FormItemContainer>
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

      <button type="submit" onClick={handleSubmit}>
        צור אימון
      </button>
    </RequestForm>
  );
};

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default SetGroupLesson;