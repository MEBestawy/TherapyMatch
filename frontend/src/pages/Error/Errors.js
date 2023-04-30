import { useRouteError } from "react-router-dom";

function ErrorPage(props) {
  const error = useRouteError();
  console.error(error);

  return (
    <>
        error
    </>
  );
}

export { ErrorPage };
