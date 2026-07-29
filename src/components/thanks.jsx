import { Link } from "react-router-dom";
import LottieLoop from "./lottiecomp";
import Hero from "../assets/lotties/thanks.json";

const Thanks = () => {
  return (
    <div className="extraPage">
      <LottieLoop animationData={Hero} className="thanksLottie" />
      <h4>Thanks! Your message has been delivered</h4>
      <p>Our team will get in touch with you shortly.</p>
      <Link to="/" className="button1">Back to Home</Link>
    </div>
  );
};

export default Thanks;