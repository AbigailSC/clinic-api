import { document } from '@config';
import { FormType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Document } from '@models';
import { getCurrentDateFormatted, getPdfFilename } from '@utils';
import { RequestHandler } from 'express';

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

  document.on('data', (buffer) => buffers.push(buffer));
  document.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}.pdf`,
      'Content-Length': pdfData.length
    });
    const newDocument = new Document({
      adminId,
      form: pdfData,
      signed: false,
      signedAt: null,
      signedBy: patientId
    });
    document.end();
  });
  res.json({
    status: res.statusCode,
    message: 'Form successfully generated!'
  });
});
