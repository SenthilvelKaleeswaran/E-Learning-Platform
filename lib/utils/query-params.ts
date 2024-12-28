export const queryParams = ({
  key,
  value,
  replace = false,
  deleteParam,
  deleteKey = "",
  searchParams,
  pathName,
}: {
  key: string;
  value?: any;
  replace?: boolean;
  deleteParam?: boolean;
  searchParams: any;
  pathName: any;
  deleteKey? : any
}) => {

  const params = new URLSearchParams(searchParams.toString());

  if (replace || deleteParam) params.delete(deleteKey || key);

  if (value) params.set(key, value);

  return pathName + "?" + params.toString()
};
