import { useState, useRef,useCallback} from "react";
import "./App.css";
import { GrCopy } from "react-icons/gr";
function App() {
  const [password, setPassworld] = useState("");
  const [length, setLength] = useState("");
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymborls, setIncludeSymbols] = useState(true);

  const passwordRef = useRef(null)
  const generatePassworld = (length) => {
    let char = "";
    if (includeLower) char += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) char = +"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeSymborls) char += "0123456789";
    if (includeSymborls) char += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (char.length === 0) {
      setPassworld("please select at least one character type.");
      return;
    }

    let newpassworld = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * char.length);
      newpassworld += char[randomIndex];
    }
    setPassworld(newpassworld);
  };

  const handleLengthChange = (e) => {
    setLength(Number(e.target.value));
  };

  const copyPasswordToClipboard = useCallback(() => {
    alert("passworld copied")
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
    
  }, [password])
   
   
  return (
    <>
      <div className="container">
        <div className="pass_heading">
          <h1>Password Generator</h1>
        </div>
      </div>
      <div className="input_box"></div>
      <div>
        <input
          className="input_boxs"
          type="text"
          value={password}
          ref={passwordRef}
        />
        <i onClick={copyPasswordToClipboard} >
          <GrCopy />
        </i>
      </div>
      <div className="select_passworld">
        <div>
          <h4>Select Password length(**8-50 characters**)</h4>
        </div>
        <div className="input_Enter_password">
          <input
            className="firstinput"
            type="number"
            value={length}
            onChange={handleLengthChange}
            min="0"
            max="32"
            placeholder="Enter youre password"
            
          />
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={includeLower}
          onClick={(e) => setIncludeLower(e.target.checked)}
        />
        <label htmlFor="uppercase">Include upper case</label>
        <br />
        <input
          type="checkbox"
          checked={includeUpper}
          onClick={(e) => setIncludeUpper(e.target.checked)}
        />
        <label htmlFor="lowercase">Include lower case</label>
        <br />
        <input
          type="checkbox"
          checked={includeNumber}
          onClick={(e) => setIncludeNumber(e.target.checked)}
        />
        <label htmlFor="numbers">Include numbers</label>
        <br />
        <input
          type="checkbox"
          checked={includeSymborls}
          onClick={(e) => setIncludeSymbols(e.target.checked)}
        />
        <label htmlFor="symbols">Include symbols</label>
      </div>
      <button onClick={() => generatePassworld(length)}>
        Generate passworld
      </button>
    </>
  );
}
export default App;
