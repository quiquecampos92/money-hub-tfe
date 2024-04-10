import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Función para manejar el cambio de fecha
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Obtener el mes y el año de la fecha seleccionada
  const selectedMonth = selectedDate?.getMonth()! + 1; // Sumamos 1 porque los meses van de 0 a 11
  const selectedYear = selectedDate?.getFullYear();

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM yyyy" // Formato de visualización (mes completo y año)
        showMonthYearPicker // Mostrar selector de mes y año en vez del día
      />
      <p style={{ display: 'none' }}>Month: {selectedMonth}</p>
      <p style={{ display: 'none' }}>Year: {selectedYear}</p>
    </div>
  );
};

export default DateSelector;
