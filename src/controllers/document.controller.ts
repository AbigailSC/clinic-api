import { FormType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Document } from '@models';
import { getCurrentDateFormatted, getPdfFilename } from '@utils';
import { RequestHandler } from 'express';
import { generateFooterPdf, generateHeaderPdf } from '@constants';
import { document } from '@config';

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

  generateHeaderPdf(document, dateFormatted);
  //document.text('Hello World!');
  generateFooterPdf(document);
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
