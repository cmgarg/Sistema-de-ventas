import { PDFDocument, rgb } from 'pdf-lib';

interface Client {
  name: string;
  email: string;
  phone: string;
}

// Función para generar el PDF
export const generatePDF = async (title: string, clients: Client[]) => {
  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();

  // Agregar una página inicial
  let page = pdfDoc.addPage([600, 800]); // Tamaño carta
  let y = 750; // Posición inicial para el contenido
  const lineHeight = 20; // Espaciado entre líneas

  // Función para agregar una nueva página
  const addNewPage = () => {
    page = pdfDoc.addPage([600, 800]);
    y = 750; // Reiniciar posición vertical
  };

  // Dibujar el título
  page.drawText(title, {
    x: 50,
    y,
    size: 24,
    color: rgb(0, 0.5, 0.8),
  });

  y -= lineHeight * 2; // Espacio después del título

  // Dibujar encabezado
  page.drawText('Clientes:', {
    x: 50,
    y,
    size: 18,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight;

  // Dibujar la lista de clientes
  clients.forEach((client, index) => {
    if (y < 50) addNewPage(); // Agregar una nueva página si no hay suficiente espacio

    // Dibujar el cliente
    page.drawText(`${index + 1}. Nombre: ${client.name}`, { x: 50, y, size: 14 });
    page.drawText(`   Email: ${client.email}`, { x: 50, y: y - lineHeight / 2, size: 12 });
    page.drawText(`   Teléfono: ${client.phone}`, { x: 50, y: y - lineHeight, size: 12 });

    y -= lineHeight * 2; // Reducir la posición vertical para el siguiente cliente
  });

  // Guardar y descargar el PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.pdf`;
  link.click();
};
