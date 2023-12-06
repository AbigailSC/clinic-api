import { FormType, QueryType } from '@interfaces';
import { catchAsync } from '@middlewares';
import { Document } from '@models';
import { getCurrentDateFormatted, getPdfFilename } from '@utils';
import { RequestHandler } from 'express';
import {
  generateFooterPdf,
  generateHeaderPdf,
  generateTablePersonalInfoPdf
} from '@constants';
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
  generateTablePersonalInfoPdf(document, form.personalInfo, 'Personal Info');
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

export const signDocument: RequestHandler = catchAsync(async (req, res) => {
  const documentSigned = req.file;
  console.log(documentSigned);
  const { id } = req.params;
  await Document.findByIdAndUpdate(id, {
    signed: true,
    signedAt: new Date()
  });
  res.json({
    status: res.status,
    message: "Document signed susscefully!"
  })
})

export const getDocuments: RequestHandler = catchAsync(async(req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const documentsLength = await Document.countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: "No documents found"
    })
  }
  const documents = await Document.find()
    .populate('adminId signedBy')
    .limit(limit)
    .skip((page - 1) * limit);

    const documentsResponse = {
      totalPages: Math.ceil(documentsLength / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(documentsLength / limit),
      hasPreviousPage: page > 1,
      data: documents
    };

  res.json({
    status: res.status,
    message: "Documents obtained",
    data: documentsResponse
  })
});

export const getDocumentsByAdmin = catchAsync( async(req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const { id:adminId } = req.params;
  const documentsLength = await Document.find({
    adminId
  }).countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: "No documents found for this admin"
    })
  }
  const documents = await Document.find()
    .populate('adminId signedBy')
    .limit(limit)
    .skip((page - 1) * limit);

    const documentsResponse = {
      totalPages: Math.ceil(documentsLength / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(documentsLength / limit),
      hasPreviousPage: page > 1,
      data: documents
    };

  res.json({
    status: res.status,
    message: "Documents obtained by admin",
    data: documentsResponse
  })
})

export const getDocumentsByPatient = catchAsync( async(req,res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const { id:signedBy } = req.params;
  const documentsLength = await Document.find({
    signedBy
  }).countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: "No documents found for this patient"
    })
  }
  const documents = await Document.find()
    .populate('adminId signedBy')
    .limit(limit)
    .skip((page - 1) * limit);

    const documentsResponse = {
      totalPages: Math.ceil(documentsLength / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(documentsLength / limit),
      hasPreviousPage: page > 1,
      data: documents
    };

  res.json({
    status: res.status,
    message: "Documents obtained by patient",
    data: documentsResponse
  })
})

export const getDocumentsByDateRange = catchAsync(async (_req, _res) => {

})