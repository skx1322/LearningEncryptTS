import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div>
      <h1>Error Issue</h1>
      <Link to={"/"}>Go Back</Link>
    </div>
  );
}
