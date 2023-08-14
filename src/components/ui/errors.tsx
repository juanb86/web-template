interface errorFieldsI {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
}

export const ShowErrorFields = ({
  errorFields,
}: {
  errorFields: errorFieldsI | undefined;
}) => {
  if (!errorFields) return;
  return (
    <div className="absolute bottom-full left-0 z-50 mb-1 rounded-sm bg-red-500 px-2 text-white opacity-90 after:absolute after:left-1/2 after:top-full after:-ml-1 after:border-4 after:border-solid after:border-transparent after:border-t-red-500">
      {Object.entries(errorFields).map(([field, errors]) => (
        <div className="flex items-baseline" key={field}>
          {" "}
          <p className="capitalize">Error in {field}:</p>
          <ul className="ml-2">
            {errors && errors.map((error) => <li key={error}> {error}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const ShowErrorMsg = ({
  errorMsg,
}: {
  errorMsg: string | false | undefined;
}) => {
  if (!errorMsg) return;
  return (
    <div className="absolute bottom-full left-0 z-50 mb-1 rounded-sm bg-red-500 px-2 text-white opacity-90 after:absolute after:left-1/2 after:top-full after:-ml-1 after:border-4 after:border-solid after:border-transparent after:border-t-red-500">
      <p>{errorMsg}</p>
    </div>
  );
};
