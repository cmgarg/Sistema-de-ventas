import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import { es } from "date-fns/locale";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderHeader = () => {
    const monthYearFormatted = format(currentMonth, "MMMM yyyy", {
      locale: es,
    });
    const capitalizedMonthYear = capitalizeFirstLetter(monthYearFormatted);

    return (
      <div className="flex justify-between items-center p-4 text-white">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="font-bold"
        >
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          }
        </button>
        <span className="text-xl">{capitalizedMonthYear}</span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="font-bold"
        >
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          }
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth, { locale: es });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className="col-center text-lg font-medium uppercase text-gray-600"
          key={i}
        >
          {format(addDays(startDate, i), dateFormat, { locale: es })}
        </div>
      );
    }

    return <div className="grid text-center grid-cols-7">{days}</div>;
  };

  const handleCellClick = (dayKey: string) => {
    const dayEvents = events[dayKey];
    if (dayEvents && dayEvents.length > 0) {
      alert(dayEvents.join("\n"));
    } else {
      alert("No hay eventos para este día");
    }
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: es });
    const endDate = endOfWeek(monthEnd, { locale: es });

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const dayKey = format(day, "yyyy-MM-dd");
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const isCurrentDay = isToday(day);
        days.push(
          <div
            className={`py-2 border border-gray-200 text-center ${
              !isCurrentMonth ? "text-gray-700" : ""
            } ${isCurrentDay ? "bg-blue-700 font-bold" : ""}`}
            key={day.toString()}
            onClick={() => handleCellClick(dayKey)}
          >
            {formattedDate}
            {events[dayKey]?.map((event, eventIndex) => (
              <div key={eventIndex}>{event}</div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
