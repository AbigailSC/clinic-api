export const generateHeaderPdf = (document: PDFKit.PDFDocument) => {
  document
    // .image(route, 50, 50, {
    //   width: 50
    // })
    .fontSize(10)
    .font('Helvetica')
    .text('Préstamo Personal Acontecimiento | Mediano Plazo', 200, 65, {
      align: 'right'
    })
    .moveDown();
};
