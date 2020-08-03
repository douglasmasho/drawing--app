import React, {useRef} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false) 
  //when using useRef hook to attach one to an element/ pass null as an argument,
  // it is only in React.createref that you dont have to pass in an argument or when using the useRef() hook when creating global variables,

  useEffect(()=>{
    console.log("COD")
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    const context = canvas.getContext("2d");
    context.scale(2,2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    //you can assign a value to a Ref 

  }, [])

  const startDrawing = ({nativeEvent})=>{
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    setIsDrawing(true)
  }
  const finishDrawing = () =>{
    contextRef.current.closePath();
    setIsDrawing(false);

  }

  const draw = ({nativeEvent})=>{
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY);
    contextRef.current.stroke()

  }
  return (
    
    <canvas ref={canvasRef}
     onMouseDown={startDrawing} 
     onMouseUp={finishDrawing}
     onMouseMove={draw}
    />
  );
}

//onMouseDown// is when the user holds down the mouse
//onMousUp//is when the user releases the mouse
//onMouseMove//when the user moves the mouse

export default App;
