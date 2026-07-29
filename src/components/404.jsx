import { Link } from "react-router-dom";
import LottieLoop from "./lottiecomp";
import Hero from "../assets/lotties/404.json";

const NotFound = () => {
  return (
    <div className="extraPage">
      <LottieLoop animationData={Hero} className="Lottie404" />
      <h4>Sorry, this page doesn’t exist.</h4>
      <p>Looks like you took a wrong turn, let’s get you back on track.</p>
      <Link to="/" className="button1">Back to Home</Link>
    </div>
  );
};

export default NotFound;