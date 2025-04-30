import { PDFDocument, rgb } from "pdf-lib";

export const generateClientsPDF = async (title: string, clients: any[]) => {
  try {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([800, 800]);
    let y = 750;
    const lineHeight = 20;

    // Ajustamos los anchos de las columnas para dar más espacio a "Email" y "CUIT/CUIL"
    const columnWidths = [100, 150, 100, 150, 120, 100];
    const tableStartX = 50;
    const tableEndX =
      tableStartX + columnWidths.reduce((sum, width) => sum + width, 0);

    const addNewPage = () => {
      page = pdfDoc.addPage([800, 800]);
      y = 750;
    };

    // Dibujar el título
    page.drawText(title, {
      x: 50,
      y,
      size: 18,
      color: rgb(0, 0.5, 0.8),
    });

    y -= lineHeight * 2;

    // Dibujar encabezados
    const headers = [
      "Nombre",
      "Dirección",
      "Teléfono",
      "Email",
      "CUIT/CUIL",
      "Tipo Cliente",
    ];

    let x = tableStartX;
    headers.forEach((header, index) => {
      page.drawText(header, { x, y, size: 10, color: rgb(0, 0, 0) });
      x += columnWidths[index];
    });

    // Línea debajo del encabezado
    page.drawLine({
      start: { x: tableStartX, y: y - 5 },
      end: { x: tableEndX, y: y - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;

    // Dibujar los datos de los clientes con líneas horizontales
    clients.forEach((client) => {
      if (y < 50) addNewPage();

      x = tableStartX;
      const rowData = [
        client?.name || "Sin Nombre",
        client?.address || "Sin Dirección",
        client?.phone?.toString() || "Sin Teléfono",
        client?.email || "Sin Email",
        client?.CUIT_CUIL || "Sin CUIT/CUIL",
        client?.clientType || "Sin Tipo",
      ];

      // Dibujar las celdas
      rowData.forEach((data, index) => {
        page.drawText(data, { x, y, size: 10, color: rgb(0, 0, 0) });
        x += columnWidths[index];
      });

      // Línea horizontal debajo de la fila
      page.drawLine({
        start: { x: tableStartX, y: y - 5 },
        end: { x: tableEndX, y: y - 5 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });

      y -= lineHeight;
    });

    // Guardar y descargar el PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.pdf`;
    link.click();
  } catch (error) {
    console.error("Error generando PDF:", error);
  }
};
