import pdf from 'pdfkit';

export const document = new pdf({
  size: 'A4',
  bufferPages: true,
  margin: 50,
  layout: 'portrait',
  info: {
    Title: 'Document'
  }
});
