import path from 'path';

const route = path.join(__dirname, '../../assets/images/app_logo.webp');

const publicRoute = path.join(route, 'public');

export const generateHeaderPdf = (document: PDFKit.PDFDocument) => {
  console.log('🚀 ~ file: pdfTemplate.ts:4 ~ route:', route);
  console.log('🚀 ~ file: pdfTemplate.ts:7 ~ publicRoute:', publicRoute);
  document
    .image(route, 50, 50, {
      width: 50
    })
    .fontSize(10)
    .font('Helvetica')
    .text('Préstamo Personal Acontecimiento | Mediano Plazo', 200, 65, {
      align: 'right'
    })
    .moveDown();
};
