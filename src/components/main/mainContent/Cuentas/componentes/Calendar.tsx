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

const Calendar: React.FC<CalendarProps> = ({ diaSeleccionado, setDiaSeleccionado }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});
  

  const capitalizeFirstLetter = (string:string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderHeader = () => {
    const monthYearFormatted = format(currentMonth, "MMMM yyyy", {
      locale: es,
    });
    const capitalizedMonthYear = capitalizeFirstLetter(monthYearFormatted);

    return (
      <div className="flex justify-between items-center p-2 text-white">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="font-bold outline-none hover:bg-gray-600 rounded-full p-2"
        >
          {
            <VscArrowLeft size={20} />
          }
        </button>
        <span className="text-xl">{capitalizedMonthYear}</span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="font-bold outline-none hover:bg-gray-600 rounded-full p-2"
        >
          {
            <VscArrowRight size={20} />
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
    setDiaSeleccionado(dayKey)
    console.log(diaSeleccionado,"dia seleccionaod ene l calendario")
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
          } ${isCurrentDay ? "bg-blue-700 font-bold" : ""} ${
            diaSeleccionado === dayKey ? "bg-gray-600" : ""
          }`} // Añade esta línea
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
