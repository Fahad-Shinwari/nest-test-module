import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/Login";

function App() {
  return [
    <ToastContainer key="toasts" autoClose={ 3500 } hideProgressBar />,
    <div className="App">
      <Login />
    </div>
  ]
}

export default App;
