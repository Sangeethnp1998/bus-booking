import { useTitle } from "../../hooks/use-title/useTitle";

export const ErrorPage = () => {
  useTitle(" Error - Bus Booking ");
  return (
    <div className="flex w-full items-center justify-center">
      <h1>Error</h1>
    </div>
  );
};
