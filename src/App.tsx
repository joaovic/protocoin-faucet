import { mint } from "./Web3Service";

function App() {
  function onBtnClicked() {
    mint()
      .then((tx) => alert(tx))
      .catch(err => alert(err.message));
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
        <p className="lead">Once a day, earn 1.000 coins for free just connecting your Metamask below.</p>
        <p className="lead">
          <a href="#" onClick={onBtnClicked} className="btn btn-lg btn-light fw-bold border-white bg-white">
            <img src="/assets/metamask.svg" alt="Metamask Logo" width={48}/>
            Claim 1.000 coins</a>
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Build by <a href="https://www.linkedin.com/in/joaovic/" className="text-white">joaovic</a>.</p>
      </footer>
    </div>
  );
}

export default App;
