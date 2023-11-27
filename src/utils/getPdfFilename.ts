import { APPNAME } from '@constants';

export const getPdfFilename = (
  name: string,
  lastname: string,
  date: string
): string => {
  const filename = `${APPNAME} - ${name} ${lastname} - ${date}.pdf`;
  return filename;
};
