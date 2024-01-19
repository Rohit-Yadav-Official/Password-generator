import React, { useState ,useCallback,useEffect, useRef} from 'react'
import './App.css'

function App() {
  let [length, setLength] = useState(8);
  let [numberallowed, setNumberallowed] = useState(false);
  let [charallowed, setCharallowed] = useState(false);
  let [password, setPassword] = useState('');

  let copypassowrd=useRef(null);
  function copyclipboard(){
   copypassowrd.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed) str+="0987654321";
    if (charallowed) str+="!@#$%^&*()_+{}:";
    for(let i=0;i<length;i++){
     let char=Math.floor((Math.random()*str.length+1))
     pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberallowed,charallowed,setLength])


  useEffect(()=>{
      passwordgenerator()
  },[numberallowed,charallowed,length])

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleNumberAllowedChange = () => {
    setNumberallowed((prev) => !prev);
  };

  const handleCharAllowedChange = () => {
    setCharallowed((prev) => !prev);
  };

  return (
    <div>
      <h1>Password Generator</h1>
      <br />
      <br />
      <input type="text" value={password} readOnly ref={copypassowrd} />
      &nbsp;
      <button  onClick={copyclipboard}>Copy</button>
      <br />
      <input type="range" value={length} onChange={handleLengthChange} min={8} max={50} />
      <label>Length={length}</label>
      &nbsp;&nbsp;&nbsp;
      <input type="checkbox" checked={numberallowed} onChange={handleNumberAllowedChange} />
      
      <label >numbers</label>
      &nbsp;&nbsp;&nbsp;
      <input type="checkbox" checked={charallowed} onChange={handleCharAllowedChange} />
      <label >specialchar</label>   
    </div>
  );
}

export default App;
