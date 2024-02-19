import { useEffect, useState } from "react";

const Calc = () => {
    const ch1 = ["(", ")", "ans", "del", "clear"];
    const ch2 = [7, 8, 9, "%", "√"];
    const ch3 = [4, 5, 6, "x", "÷"];
    const ch4 = [1, 2, 3, "+", "-"];
    const ch5 = [".", 0, "±", "ENTER"];
    const [value, setValue] = useState("0");
    const [line, setLine] = useState("0");
    const [firstZero, setFirstZero] = useState(false);
    const [ans, setAns] = useState("0");
    const [ans1, setAns1] = useState("0"); //For ans button
    const [click, setClick] = useState(false); //Si value est vide, number s'écrit directement dans value
    const [clickNumber, setClickNumber] = useState(false); //Je fait dans le code le fait que if(value===ans) pour traiter le cas quand user change le symbole (entre + et - par exemple), clickNumber pour le cas de si user a créer sur un nombre egal à ans
    const [syntaxeError, setSyntaxeError] = useState(false);
    const [clickParenthesis, setClickParenthesis] = useState(0); //Array for couting value where we click ")", the first is the number and the second is the index

    useEffect(() => {
        if (value.length > 11) {
            setValue(value.substring(0, 12));
        }
    }, [value]);

    useEffect(
        () => {
            if (line.includes("/0") || line.includes("%0")) {
                setLine(line.substring(0, line.length - 2));
                setAns1(0);
                setSyntaxeError(true);
            }
            let myP = document.getElementById("forScrolling");
            if (myP) {
                myP.scrollBy(myP.scrollWidth + 100000, 0);
            }
        },
        [line, ans],
        clickParenthesis
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "*") {
                handleClick("x");
            } else if (e.key === "/") {
                handleClick("÷");
            } else if (e.key === "Backspace") {
                handleClick("del");
            } else if (e.key === "Enter") {
                handleClick("ENTER");
            } else if (/^\d$/.test(e.key)) {
                handleClick(Number(e.key));
            } else {
                handleClick(e.key);
            }
            console.log(e.key);
        };

        // Add event listener when component mounts
        window.addEventListener("keydown", handleKeyDown);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleClick = (ch) => {
        if (Number.isInteger(ch)) {
            if (!click) {
                if (line.charAt(line.length - 1) === ")") {
                    setLine("0");
                }
                if (value.toString().includes(".")) {
                    var [integerPart, decimalPart] = value.split(".");
                    if (firstZero) {
                        decimalPart = ch;
                        setFirstZero(false);
                    } else {
                        decimalPart = decimalPart + ch;
                    }
                    setValue(integerPart + "." + decimalPart);
                } else {
                    setValue((parseInt(value * 10) + ch).toString());
                }
            } else {
                setValue(ch.toString());
                setClick(false);
            }
            setClickNumber(true);
        } else if (ch === ".") {
            if (!value.toString().includes(".")) {
                setFirstZero(true);
                setValue(value + ".0");
            }
        }
    };

    return <div>Calc</div>;
};

export default Calc;
