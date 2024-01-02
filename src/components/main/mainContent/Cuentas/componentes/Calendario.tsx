import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const renderHeader = () => {
        return <div>{format(currentMonth, 'MMMM yyyy')}</div>;
    };

    const renderDays = () => {
        const dateFormat = 'iii'; // Formato de día de la semana (ej. Mon, Tue)
        const days = [];

        let startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                days.push(
                    <div key={day.toString()}>
                        {formattedDate}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="flex flex-row" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="flex flex-col">{rows}</div>;
    };

    return (
        <div>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
