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

    return <div>Calc</div>;
};

export default Calc;
