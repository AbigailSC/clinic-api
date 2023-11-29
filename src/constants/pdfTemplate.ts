export const generateMetadaPdf = (
  document: PDFKit.PDFDocument,
  filename: string
) => {
  document.info.Title = filename;
  document.info.Author = 'Hospital App';
};

export const generateHeaderPdf = (
  document: PDFKit.PDFDocument,
  currentDate: string
) => {
  document.lineWidth(1200);
  document.lineCap('butt').moveTo(0, 0).lineTo(0, 80).stroke('#0ea5e9');
  document.fillColor('#fff').fontSize(10).font('Helvetica-Bold');
  document
    .text('HOSPITAL APP', 40, 40, {
      align: 'left'
    })
    .text(`Date: ${currentDate}`, 40, 40, {
      align: 'right'
    })
    .moveDown();
};

export const generateFooterPdf = (
  document: PDFKit.PDFDocument,
  page: number = 1
) => {
  const pageHeight = 850;
  document.lineWidth(1200);
  document
    .lineCap('butt')
    .moveTo(0, pageHeight - 40)
    .lineTo(0, pageHeight)
    .stroke('#0ea5e9');
  document
    .fontSize(10)
    .fillColor('#fff')
    .text(`Page ${page}`, 0, pageHeight - 30, { align: 'center' });
};
