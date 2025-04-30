import { PDFDocument, rgb } from "pdf-lib";

export const generatePDF = async (title: string, articles: any[]) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([800, 800]);
  let y = 750;
  const lineHeight = 20;
  const columnWidths = [150, 100, 100, 100, 80, 60, 60];
  const tableStartX = 50;
  const tableEndX = tableStartX + columnWidths.reduce((sum, width) => sum + width, 0);

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
    "Código",
    "Categoría",
    "Subcategoría",
    "Stock",
    "Costo",
    "Venta",
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

  // Dibujar los datos de los artículos con líneas horizontales
  articles.forEach((article) => {
    if (y < 50) addNewPage();

    x = tableStartX;
    const rowData = [
      article.article.name || "Sin Nombre",
      article.code || "Sin Código",
      article.category?.label || "Sin Categoría",
      article.subCategory?.label || "Sin Subcategoría",
      `${article.article.stock.amount} ${article.article.stock.unit?.abrevUnit || ""}`,
      `$${article.article.costo}`,
      `$${article.article.venta}`,
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
};
