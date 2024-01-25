import "./App.css";
import { Main } from "./components/index";
import { SharedStateProvider } from "./SharedStateContext";

function App() {
  return (
    <SharedStateProvider>
      <div className="App">
        <div className="flex h-screen w-screen items-center justify-center bg-slate-800">
          <Main />
        </div>
      </div>
    </SharedStateProvider>
  );
}

export default App;
