import React from 'react'
import CalculatorDisplay from './CalculatorDisplay'
function Calculator() {
  return (
    <div className='bg-gray-800 text-white w-screen h-screen flex justify-center items-center'>
    <div className='main w-64 h-auto bg-gray-900-2xl shadow border-4 border-gray-100'><CalculatorDisplay/></div>  
    </div>
  )
}

export default Calculator
