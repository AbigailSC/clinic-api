import {
  FilteerByDateType,
  FilterBySignType,
  FormType,
  QueryType
} from '@interfaces';
import { catchAsync } from '@middlewares';
import { Document } from '@models';
import { generatePDF, getCurrentDateFormatted, getPdfFilename } from '@utils';
import { RequestHandler } from 'express';
import { config, document, s3 } from '@config';

export const postDocument: RequestHandler = catchAsync(async (req, res) => {
  const form: FormType = req.body;
  const { patientId, adminId } = req.body;

  const dateFormatted = getCurrentDateFormatted(new Date());
  const filename = getPdfFilename(
    form.personalInfo.name,
    form.personalInfo.lastname,
    dateFormatted
  );

  const pdfDataBuffer = await generatePDF(document, form, dateFormatted);

  await s3.putObject({
    Bucket: config.s3.bucketName,
    Key: `Consents/${filename}`,
    Body: pdfDataBuffer,
    ACL: 'public-read'
  });
  const filepathPdf = `${config.s3.endpoint}${config.s3.bucketName}/Consents/${filename}`;

  console.log(
    '🚀 ~ constpostDocument:RequestHandler=catchAsync ~ config.s3.bucketName:',
    config.s3.bucketName
  );

  console.log(
    '🚀 ~ constpostDocument:RequestHandler=catchAsync ~ config.s3.endpoint:',
    config.s3.endpoint
  );

  const newDocument = new Document({
    adminId,
    form: filepathPdf,
    signed: false,
    signedAt: null,
    signedBy: patientId
  });
  await newDocument.save();

  res.json({
    status: res.statusCode,
    message: 'Form successfully generated!'
  });
});

export const signDocument: RequestHandler = catchAsync(async (req, res) => {
  const documentSigned = req.file as Express.MulterS3.File;

  const { id } = req.params;
  await Document.findByIdAndUpdate(id, {
    form: documentSigned.location,
    signed: true,
    signedAt: new Date()
  });
  res.json({
    status: res.status,
    message: 'Document signed susscefully!'
  });
});

export const getDocuments: RequestHandler = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const documentsLength = await Document.countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: 'No documents found'
    });
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
    message: 'Documents obtained',
    data: documentsResponse
  });
});

export const getDocumentsByAdmin = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const { id: adminId } = req.params;
  const documentsLength = await Document.find({
    adminId
  }).countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: 'No documents found for this admin'
    });
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
    message: 'Documents obtained by admin',
    data: documentsResponse
  });
});

export const getDocumentsByPatient = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query as QueryType;
  const { id: signedBy } = req.params;
  const documentsLength = await Document.find({
    signedBy
  }).countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: 'No documents found for this patient'
    });
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
    message: 'Documents obtained by patient',
    data: documentsResponse
  });
});

export const getDocumentsByDateRange = catchAsync(async (req, res) => {
  const { dateStart, dateEnd } = req.query as FilteerByDateType;
  const startDate = new Date(dateStart as string);
  const endDate = new Date(dateEnd as string);

  const documents = await Document.find({
    createdAt: { $gte: startDate, $lte: endDate }
  });

  res.json({
    status: res.status,
    message: 'Documents obtained!',
    data: documents
  });
});

export const filterDocumentsSigned = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, signed = true } = req.query as FilterBySignType;
  const documentsLength = await Document.find({
    signed
  }).countDocuments();
  if (documentsLength === 0) {
    res.status(204).json({
      status: res.status,
      message: 'No documents found'
    });
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
    message: 'Documents obtained',
    data: documentsResponse
  });
});

export const orderDocumentsByDateSigned = catchAsync(async (_req, _res) => {});

export const orderDocumentsByDateCreated = catchAsync(async (_req, _res) => {});

export const orderDocumentsByPatientName = catchAsync(async (_req, _res) => {});
