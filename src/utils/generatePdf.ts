import { generateFooterPdf, generateHeaderPdf, generateTablePersonalInfoPdf } from "@constants";
import { FormType } from "@interfaces";

export const generatePDF = async (document: PDFKit.PDFDocument, form: FormType, dateFormatted: string): Promise<Buffer> => {
    const buffers: Array<Uint8Array> = [];
    
    generateHeaderPdf(document, dateFormatted);
    generateTablePersonalInfoPdf(document, form.personalInfo, 'Personal Info'); 
    generateFooterPdf(document);
  
    document.on('data', (buffer) => buffers.push(buffer));
  
    return await new Promise<Buffer>((resolve) => {
      document.on('end', async () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      document.end();
    });
  }
  
  