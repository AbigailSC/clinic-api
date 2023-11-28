import PDFDocument from 'pdfkit';
import { FormType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Document } from '@models';
import { getCurrentDateFormatted, getPdfFilename } from '@utils';
import { RequestHandler } from 'express';
//import { generateHeaderPdf } from 'src/constants/pdfTemplate';

export const postDocument: RequestHandler = catchAsync(async (req, res) => {
  const form: FormType = req.body;
  const { patientId, adminId } = req.body;
  const dateFormatted = getCurrentDateFormatted(new Date());
  const filename = getPdfFilename(
    form.personalInfo.name,
    form.personalInfo.lastname,
    dateFormatted
  );

  const buffers: Buffer[] = [];
  //generateHeaderPdf(document);

  const document = new PDFDocument({
    size: 'A4',
    bufferPages: true,
    margin: 50,
    layout: 'portrait',
    info: {
      Title: 'Document'
    }
  });
  document.text('Hello World!');
  document.end();
  document.on('data', (buffer) => buffers.push(buffer));
  document.on('end', async () => {
    const pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}.pdf`,
      'Content-Length': pdfData.length
    });

    res.write(pdfData);
    res.end();

    const newDocument = new Document({
      adminId,
      form: pdfData,
      signed: false,
      signedAt: null,
      signedBy: patientId
    });
    await newDocument.save();
  });

  // res.json({
  //   status: res.statusCode,
  //   message: 'Form successfully generated!'
  // });
});
