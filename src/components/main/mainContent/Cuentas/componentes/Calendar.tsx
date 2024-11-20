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
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

interface CalendarProps {
  diaSeleccionado: string | null;
  setDiaSeleccionado: (dia: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  diaSeleccionado,
  setDiaSeleccionado,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderHeader = () => {
    const monthYearFormatted = format(currentMonth, "MMMM yyyy", {
      locale: es,
    });
    const capitalizedMonthYear = capitalizeFirstLetter(monthYearFormatted);

    return (
      <div className="flex justify-between items-center text-white">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="font-bold outline-none hover:bg-gray-600  h-6 w-7 flex justify-center items-center"
        >
          {<VscArrowLeft size={15} />}
        </button>
        <span className="text-sm">{capitalizedMonthYear}</span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="font-bold outline-none hover:bg-gray-600   h-6 w-7 flex justify-center items-center"
        >
          {<VscArrowRight size={15} />}
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
          className="col-center text-sm font-medium uppercase text-gray-50"
          key={i}
        >
          {format(addDays(startDate, i), dateFormat, { locale: es })}
        </div>
      );
    }

    return <div className="grid text-center grid-cols-7">{days}</div>;
  };

  const handleCellClick = (dayKey: string) => {
    setDiaSeleccionado(dayKey);
    console.log(diaSeleccionado, "dia seleccionaod ene l calendario");
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
            className={`py-1 hover:bg-yellow-700 hover:brightness-125 border-gray-300 cursor-pointer text-center ${
              i < 6 ? "border-r" : null
            } ${!isCurrentMonth ? "text-gray-500" : ""} ${
              isCurrentDay ? "bg-blue-300 font-bold" : ""
            } ${diaSeleccionado === dayKey ? "bg-gray-400" : ""}`}
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
        <div
          className={`grid grid-cols-7 border-gray-300 border ${
            rows.length === 0 ? "rounded-t-lg" : ""
          } ${day > endDate ? "rounded-b-lg" : ""}`}
          key={day.toString()}
        >
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body rounded-lg overflow-hidden border">{rows}</div>;
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
