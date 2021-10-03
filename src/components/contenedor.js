import { React, useState, useEffect } from 'react';
import { Container, Button, Stack, Box } from '@mui/material';

function Contenedor() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("0");
    const [outputHasOperator, setOutputHasOperator] = useState(false);
    const [outputHasDecimal, setOutputHasDecimal] = useState(false);
    const [outputHasNegativeSign, setOutputHasNegativeSign] = useState(false);
    const [evaluated, setEvaluated] = useState(false);

    // Manejar cada click en una tecla numérica
    const handleClick = e => {
        const regex = /[+-x/]/g;
        const { value } = e.target
        if (outputHasOperator) {
            setOutput(output.replace(regex, "") + value)
            setInput(prevState => output.indexOf("0") == 0 ? prevState + value : input + value)
            setOutputHasOperator(false)
            setOutputHasNegativeSign(false)
        } else {
            setOutput(prevState => output.indexOf("0") == 0 ? value : prevState + value)
            setInput(prevState => output.indexOf("0") == 0 ? value : prevState + value)
        }
    }

    // Manejar las distintas operaciones según el ID de la tecla
    const handleOperation = (e) => {
        const { id } = e.target

        if (!outputHasOperator && !outputHasNegativeSign) {
            switch (id) {
                case "add":
                    if (evaluated) {
                        setInput(output + "+")
                        setEvaluated(false)
                    } else {
                        setInput(input + "+")
                    }
                    setOutput("+")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(false)
                    break;
                case "subtract":
                    if (evaluated) {
                        setInput(output + "-")
                        setEvaluated(false)
                    } else {
                        setInput(input + "-")
                    }
                    setOutput("-")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(true)
                    break;
                case "multiply":
                    if (evaluated) {
                        setInput(output + "*")
                        setEvaluated(false)
                    } else {
                        setInput(input + "*")
                    }
                    setOutput("x")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(false)
                    break;
                case "divide":
                    if (evaluated) {
                        setInput(output + "/")
                        setEvaluated(false)
                    } else {
                        setInput(input + "/")
                    }
                    setOutput("/")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(false)
                    break;
            }
        } else if (outputHasOperator && !outputHasNegativeSign) {
            switch (id) {
                case "subtract":
                    if (evaluated) {
                        setInput(output + "-")
                        setEvaluated(false)
                    } else {
                        setInput(input + "-")
                    }
                    setOutput("-")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(true)
                    break;
                case "multiply":
                    if (evaluated) {
                        setInput(output + "*")
                        setEvaluated(false)
                    } else {
                        setInput(input + "*")
                    }
                    setOutput("x")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(false)
                    break;
                case "divide":
                    if (evaluated) {
                        setInput(output + "/")
                        setEvaluated(false)
                    } else {
                        const regex = /[+x]/g;
                        const inputResult = input.lastIndexOf(regex).replace("/", "/")
                        setInput(inputResult)
                    }
                    setOutput("/")
                    setOutputHasOperator(true)
                    setOutputHasDecimal(false)
                    setOutputHasNegativeSign(false)
                    break;
            }
        }
    }

    // Añadir el signo decimal
    const handleDecimal = () => {
        if (!outputHasDecimal) {
            setInput(prevState => prevState + ".")
            setOutput(prevState => prevState + ".")
            setOutputHasDecimal(true)
        }
    }

    // Calcular el resultado
    const calculate = () => {
        const regex = /[+-x/]/g
        const lastIndexSignInput = input.lastIndexOf("+")
        if (!evaluated && lastIndexSignInput != input.length-1) {
            setOutput(eval(input))
            setOutputHasOperator(false)
            setOutputHasDecimal(false)
            setOutputHasNegativeSign(false)
            setEvaluated(true)
        }
    }

    // Reiniciar todos los states
    const clearDisplay = () => (
        setInput(""),
        setOutput("0"),
        setOutputHasOperator(false),
        setOutputHasDecimal(false),
        setOutputHasNegativeSign(false)
    )

    return (
        <Container>
            <Box id="inputDisplay" sx={{ p: 2 }}>{input}</Box>
            <Box id="display" sx={{ p: 2 }}>{output}</Box>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
                <Button value="0" id="zero" variant="contained" onClick={handleClick}>0</Button>
                <Button value="1" id="one" variant="contained" onClick={handleClick}>1</Button>
                <Button value="2" id="two" variant="contained" onClick={handleClick}>2</Button>
                <Button id="clear" variant="contained" onClick={clearDisplay}>AC</Button>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
                <Button value="3" id="three" variant="contained" onClick={handleClick}>3</Button>
                <Button value="4" id="four" variant="contained" onClick={handleClick}>4</Button>
                <Button value="5" id="five" variant="contained" onClick={handleClick}>5</Button>
                <Button id="add" variant="contained" onClick={handleOperation}>+</Button>
                <Button id="multiply" variant="contained" onClick={handleOperation}>X</Button>
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
                <Button value="6" id="six" variant="contained" onClick={handleClick}>6</Button>
                <Button value="7" id="seven" variant="contained" onClick={handleClick}>7</Button>
                <Button value="8" id="eight" variant="contained" onClick={handleClick}>8</Button>
                <Button id="subtract" variant="contained" onClick={handleOperation}>-</Button>
                <Button id="divide" variant="contained" onClick={handleOperation}>/</Button>
            </Stack>
            <Stack spacing={2} direction="row">
                <Button id="decimal" variant="contained" onClick={handleDecimal}>.</Button>
                <Button value="9" id="nine" variant="contained" onClick={handleClick}>9</Button>
                <Button id="equals" variant="contained" onClick={calculate}>=</Button>
            </Stack>
        </Container>
    )
}

export default Contenedor;