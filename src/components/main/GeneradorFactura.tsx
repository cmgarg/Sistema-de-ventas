import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import logo from "../../assets/pay.png"; // Importa el archivo local

export const GeneradorFactura = async (invoiceData) => {
  try {
    const {
      company,
      client,
      items,
      totals,
      invoiceNumber,
      issueDate,
      dueDate,
      cae,
    } = invoiceData;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Tamaño A4
    const { width, height } = page.getSize();
    let y = height - 50; // Margen superior
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Logo (local)
    try {
      const response = await fetch(logo); // Maneja el logo como un recurso
      const logoBytes = await response.arrayBuffer(); // Convierte a ArrayBuffer
      const logoImage = await pdfDoc.embedPng(logoBytes); // Incrusta el logo
      page.drawImage(logoImage, {
        x: 50,
        y: height - 100,
        width: 100, // Ancho del logo
        height: 100, // Alto del logo
      });
      y -= 80; // Ajustar después del logo
    } catch (err) {
      console.error("Error cargando el logo:", err);
    }

    // Información de la empresa
    page.drawText(company.name, { x: 50, y, size: 12, font });
    y -= 15;
    page.drawText(company.address, { x: 50, y, size: 10, font });
    y -= 15;
    page.drawText(company.contact, { x: 50, y, size: 10, font });
    y -= 30;

    // Dibujar línea horizontal debajo de la información de la empresa
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= 20;

    // Información de la factura
    page.drawText(`Factura Nro: ${invoiceNumber}`, {
      x: 400,
      y: height - 50,
      size: 10,
      font,
    });
    page.drawText(`Fecha de Emisión: ${issueDate}`, {
      x: 400,
      y: height - 70,
      size: 10,
      font,
    });
    page.drawText(`Vto de CAE: ${dueDate}`, {
      x: 400,
      y: height - 90,
      size: 10,
      font,
    });

    // Información del cliente
    page.drawText("Datos del Cliente:", { x: 50, y, size: 12, font });
    y -= 15;
    page.drawText(`Nombre: ${client.name}`, { x: 50, y, size: 10, font });
    y -= 15;
    page.drawText(`CUIT: ${client.cuit}`, { x: 50, y, size: 10, font });
    y -= 15;
    page.drawText(`Domicilio: ${client.address}`, { x: 50, y, size: 10, font });
    y -= 30;

    // Totales
    y -= 30;
    page.drawText(`Subtotal: $${totals.subtotal.toFixed(2)}`, {
      x: 400,
      y,
      size: 10,
      font,
    });
    y -= 15;
    page.drawText(`IVA: $${totals.tax.toFixed(2)}`, {
      x: 400,
      y,
      size: 10,
      font,
    });
    y -= 15;
    page.drawText(`Total: $${totals.total.toFixed(2)}`, {
      x: 400,
      y,
      size: 12,
      font,
    });

    // Guardar PDF como Blob
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error("Error al generar la factura:", error);
    return null;
  }
};
