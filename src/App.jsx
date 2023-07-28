import Login from "./components/Login";
import AppartmentList from "./components/AppartmentList";

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
