import { APPNAME } from '@constants';

export const getPdfFilename = (
  name: string,
  lastname: string,
  date: string
): string => {
  const filename = `${APPNAME} ${name}_${lastname} ${date}`;
  return filename;
};
