import {
  generateFooterPdf,
  generateHeaderPdf,
  generateTablePersonalInfoPdf
} from '@constants';
import { FormType } from '@interfaces';
import fs from 'fs';
import path from 'path';

export const generatePDF = async (
  document: PDFKit.PDFDocument,
  form: FormType,
  dateFormatted: string
): Promise<Buffer> => {
  const buffers: Array<Uint8Array> = [];

  generateHeaderPdf(document, dateFormatted);
  generateTablePersonalInfoPdf(document, form.personalInfo, 'Personal Info');
  generateFooterPdf(document);

  document.on('data', (buffer) => buffers.push(buffer));

  return await new Promise<Buffer>((resolve) => {
    document.on('end', async () => {
      const pdfData = Buffer.concat(buffers);

      const dateString = Date.now().toString();
      const fileName = `uploads/${dateString}-doc.pdf`;
      const filePath = path.join(__dirname, '../public/', fileName);

      fs.writeFileSync(filePath, pdfData);

      resolve(pdfData);
    });
    document.end();
  });
};
