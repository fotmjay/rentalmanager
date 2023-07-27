import Login from "./components/Login";
import AppartmentList from "./components/AppartmentList";
import SpecificApp from "./components/SpecificApp";

function App() {
  const loggedIn = true;
  return (
    <div>
      {!loggedIn && <Login />}
      {loggedIn && <AppartmentList />}
    </div>
  );
}

export default App;
