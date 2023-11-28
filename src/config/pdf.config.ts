import PDFDocument from 'pdfkit';

export const document = new PDFDocument({
  size: 'A4',
  bufferPages: true,
  margin: 50,
  layout: 'portrait',
  info: {
    Title: 'Document'
  }
});
