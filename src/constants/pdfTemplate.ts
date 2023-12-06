import { PersonalInfoType } from '@interfaces';
import { Colors } from './colors';
import { getPatientAge } from '@utils';

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
  document.lineCap('butt').moveTo(0, 0).lineTo(0, 80).stroke(Colors.Blue);
  document.fillColor(Colors.White).fontSize(14).font('Helvetica-Bold');
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
    .stroke(Colors.Blue);
  document
    .fontSize(10)
    .fillColor(Colors.White)
    .text(`Page ${page}`, 0, pageHeight - 30, { align: 'center' });
};

export const generateFirstPagePdf = () => {};

export const generateTablePersonalInfoPdf = (
  document: PDFKit.PDFDocument,
  data: PersonalInfoType,
  title: string
) => {
  const age: string = getPatientAge(data.birthdate);
  document.font('Helvetica-Bold').fillColor(Colors.White).fontSize(14);

  document.lineWidth(20);
  document.lineCap('butt').moveTo(50, 100).lineTo(50, 120).stroke(Colors.Blue);
  document.text('1', 46, 104, { align: 'left' });

  document.lineWidth(20);
  document.lineCap('butt').moveTo(60, 110).lineTo(556, 110).stroke(Colors.Sky);

  document.text(title, 66, 104, { align: 'left' });

  document.font('Helvetica').fontSize(12).fillColor(Colors.DarkBlue);
  document.text('Name:', 66, 140, { align: 'left' });
  document.text(data.name, 110, 140, { align: 'left' });
  document.text('Surname:', 300, 140, { align: 'left' });
  document.text(data.lastname, 360, 140, { align: 'left' });
  document.text('Age:', 66, 160, { align: 'left' });
  document.text(age, 100, 160, { align: 'left' });
};
