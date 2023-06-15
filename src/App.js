import { Container } from "react-bootstrap";
import DatesHeader from "./components/DatesHeader";
import Dates from "./components/Dates";
import DatesAction from "./components/DatesAction";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Container style={{ height: "100vh", padding: "2rem" }}>
        <div className="d-flex flex-column gap-3 h-100">
          <DatesHeader />
          <Dates />
          <DatesAction />
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
