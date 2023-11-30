import { PersonalInfoType } from '@interfaces';

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
    .text('Consent form', 40, 40, {
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

export const generateFirstPagePdf = () => {};

export const generateTablePersonalInfoPdf = (
  document: PDFKit.PDFDocument,
  data: PersonalInfoType,
  title: string
) => {
  console.log('🚀 ~ file: pdfTemplate.ts:52 ~ data:', data);

  document.lineWidth(1200);
  document.lineCap('butt').moveTo(0, 100).lineTo(0, 120).stroke('#0ea5e9');
  document
    .font('Helvetica-Bold')
    .fillColor('#fff')
    .fontSize(16)
    .text(title, 40, 100, { align: 'left' });
};
