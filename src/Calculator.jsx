import { useState } from 'react'
import './Calculator.css'

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const calculate = (a, b, operator) => {
    switch (operator) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const handleButton = (btn) => {
    if (btn >= '0' && btn <= '9') {
      if (waitingForOperand) {
        setDisplay(btn)
        setWaitingForOperand(false)
      } else {
        setDisplay(display === '0' ? btn : display + btn)
      }
      return
    }

    if (btn === '.') {
      if (waitingForOperand) {
        setDisplay('0.')
        setWaitingForOperand(false)
        return
      }
      if (!display.includes('.')) setDisplay(display + '.')
      return
    }

    if (btn === 'C') {
      setDisplay('0')
      setPrev(null)
      setOp(null)
      setWaitingForOperand(false)
      return
    }

    if (btn === '±') {
      setDisplay(String(parseFloat(display) * -1))
      return
    }

    if (btn === '%') {
      setDisplay(String(parseFloat(display) / 100))
      return
    }

    if (btn === '=') {
      if (op && prev !== null) {
        const result = calculate(prev, parseFloat(display), op)
        setDisplay(String(result))
        setPrev(null)
        setOp(null)
        setWaitingForOperand(true)
      }
      return
    }

    // operator buttons: +, −, ×, ÷
    const current = parseFloat(display)
    if (op && !waitingForOperand) {
      const result = calculate(prev, current, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(current)
    }
    setOp(btn)
    setWaitingForOperand(true)
  }

  return (
    <div className="calculator">
      <h1 className="title">Calculator</h1>
      <div className="display">
        <span>{display}</span>
      </div>
      <div className="buttons">
        {BUTTONS.map((row, r) => (
          <div key={r} className="row">
            {row.map((btn) => (
              <button
                key={btn}
                className={`btn ${
                  ['÷', '×', '−', '+', '='].includes(btn) ? 'btn-op' : ''
                } ${btn === 'C' || btn === '±' || btn === '%' ? 'btn-fn' : ''} ${
                  btn === '0' ? 'btn-zero' : ''
                }`}
                onClick={() => handleButton(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
