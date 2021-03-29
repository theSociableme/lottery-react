// import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import React from "react";

function App(props) {
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  const [manager, setManager] = React.useState("manager");
  const [entries, setEntries] = React.useState("entries");
  const [balance, setBalance] = React.useState("balance");
  const [value, setValue] = React.useState("value");
  const [message, setMessage] = React.useState("message");

  React.useEffect(async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
    const entries = await lottery.methods.getPlayers().call();
    setEntries(entries);
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
    setValue("");
    setMessage("");
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("Waiting on transaction success...");
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setMessage("You have been entered!");
  };

  const onClick = async (event) => {
    event.preventDefault();
    setMessage("Picking a winner.....");
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("The winner has been picked!!!");
  };

  return (
    <div>
      <h2> Lottery Contract </h2>
      <p>
        This contract is managed by {manager}
        <br />
        <br />
        There are currently {entries.length} people entered
        <br />
        competeing to win {web3.utils.fromWei(web3.utils.toHex(balance))} ether!
        <br />
        <hr />
        <form onSubmit={onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label> Amount of ether to enter </label>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <button> Enter </button>
        </form>
        <hr />
        <h4>
          <button onClick={onClick}> Pick a winner! </button>
        </h4>
        <hr />
        <hr />
        <hr />
        <h1> {message}</h1>
      </p>
    </div>
  );
}

export default App;
