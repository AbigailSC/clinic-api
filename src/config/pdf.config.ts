import PDFDocument from 'pdfkit';

export const document = new PDFDocument({
  size: 'A4',
  bufferPages: true,
  margins: {
    top: 40,
    bottom: 0,
    left: 40,
    right: 40
  },
  layout: 'portrait',
  info: {
    Title: 'Document'
  }
});
