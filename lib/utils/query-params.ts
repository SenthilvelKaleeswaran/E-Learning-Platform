export const queryParams = ({
  key,
  value,
  replace = false,
  deleteParam,
  searchParams,
  pathName,
}: {
  key: string;
  value?: string;
  replace?: boolean;
  deleteParam?: boolean;
  searchParams: any;
  pathName: any;
}) => {

  const params = new URLSearchParams(searchParams.toString());

  if (replace || deleteParam) params.delete(key);

  if (value) params.set(key, value);

  return pathName + "?" + params.toString()
};
