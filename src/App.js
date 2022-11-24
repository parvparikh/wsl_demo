import Homepage from './Pages/Homepage.jsx'
import Mainpage from './Pages/Mainpage.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App h-screen">
      <Mainpage/>
    </div>
  );
}

export default App;
