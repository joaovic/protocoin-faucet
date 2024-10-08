import { mint } from "./Web3Service";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [captcha, setCaptcha] = useState("");

  const messageStyle = { color: msgColor };

  function onBtnClicked() {
    setMsgColor("white");

    if (captcha) {
      setMessage("Requesting your tokens... Please wait...");

      mint()
        .then((tx) => {setMsgColor("lightGreen"); setMessage(`Your tokens were sent to ${localStorage.getItem('wallet')}. Tx: ${tx}`)})
        .catch(err => {setMsgColor("red"); setMessage(err.response ? err.response.data : err.message )});
    } else {
      setMessage("Check the \"I'm not a robot\" captcha first.");
    }
  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Protocoin Faucet</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
            <a className="nav-link fw-bold py-1 px-0" href="#">About</a>
          </nav>
        </div>
      </header>

      <main className="px-3">
        <h1>Get yours ProtoCoins</h1>
        <p className="lead">Once a day, earn 10.000 coins for free just connecting your Metamask below.</p>
        <p className="lead">
          <a href="#" onClick={onBtnClicked} className="btn btn-lg btn-light fw-bold border-white bg-white">
            <img src="/assets/metamask.svg" alt="Metamask Logo" width={48}/>
            Get my coins
          </a>
        </p>
        <div style={{ display: "inline-flex" }}>
          <ReCAPTCHA sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`} onChange={value => setCaptcha(value || "")} />          
        </div>
        <p className="lead" style={messageStyle}>
          {message}
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Build by <a href="https://www.linkedin.com/in/joaovic/" className="text-white">joaovic</a>.</p>
      </footer>
    </div>
  );
}

export default App;
