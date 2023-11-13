import { ChangeEvent, useMemo, useState } from 'react'
import { Input } from './input/input';
import { Tr } from './table/tr';
import './App.css'
import { Chart } from './chart/chart';
import { TitlePage } from './title-page/title-page';

// FIX: Limit.
function factorial(n: number): number {
    if (n <= 0) return 1;

    return n ? n * factorial(n - 1) : 1;
}

function mathP0(c: number, N: number, w: number) {
    //P0
    var Nfac = factorial(N);
    var res = +0;
    var res1 = +0;
    var res2 = +0;

    var n = +0;

    while (n <= c) {
        var wpow = Math.pow(w, n);
        var nfac = factorial(n);
        var Nnfac = factorial(N - n);

        res1 = res1 + (Nfac * wpow) / (nfac * Nnfac);
        n++;
    }

    while (n <= N) {
        var wpow = Math.pow(w, n);
        var cfac = factorial(c);
        var Nnfac = factorial(N - n);
        var cpow = Math.pow(c, n - c);

        res2 = res2 + (Nfac * wpow) / (cpow * cfac * Nnfac);
        n++;
    }

    res = res1 + res2;
    res = 1 / res;

    return res;
}

function mathQ(c: number, N: number, w: number) {
    var P0 = mathP0(c, N, w);
    var k = c + 1;
    var res = +0;

    var Nfac = factorial(N);
    var cfac = factorial(c);

    while (k <= N) {
        // выводит 0, затем 1, затем 2
        var wpow = Math.pow(w, k);
        var cpow = Math.pow(c, k - c);
        var Nkfac = factorial(N - k);
        res = res + ((k - c) * Nfac * P0 * wpow) / (cpow * cfac * Nkfac);
        k++;
    }

    return res;
}

function mathL(c: number, N: number, w: number) {
    var Nfac = factorial(N);
    var res = +0;
    var res1 = +0;
    var res2 = +0;
    var P0 = mathP0(c, N, w);

    var n = +1;

    while (n <= c) {
        var wpow = Math.pow(w, n);
        var nfac = factorial(n);
        var Nnfac = factorial(N - n);

        res1 = res1 + ((Nfac * wpow) / (nfac * Nnfac)) * n * P0;
        n++;
    }

    n = c + 1;

    while (n <= N) {
        var wpow = Math.pow(w, n);
        var cfac = factorial(c);
        var Nnfac = factorial(N - n);
        var cpow = Math.pow(c, n - c);

        res2 = res2 + ((Nfac * wpow) / (cpow * cfac * Nnfac)) * n * P0;
        n++;
    }

    res = res1 + res2;

    return res;
}


interface Params {
    L: number;
    tno: number;
    N: number;
}

function mathTp({ L, tno, N }: Params) {
    return (L * tno) / (N - L);
}

function mathTc(Tp: number, tno: number) {
    return Tp + tno;
}

function mathPe(Tc: number, tno: number) {
    return tno / Tc;
}

function mathW(Tp: number, to: number) {
    return Tp - to;
}

/* $("#go").click(function () {
    $("#container").html("");
    var chart = anychart.line([
        { x: C, value: y1 },
        { x: (C + C2) / 2, value: (y1 + y2) / 2 - (y1 - y2) / 4 },
        { x: C2, value: y2 },
        { x: (C2 + C3) / 2, value: (y2 + y3) / 2 + (y2 - y3) / 4 },
        { x: C3, value: y3 },
    ]);
    var yTitle = chart.yAxis().title();
    yTitle.enabled(true);
    yTitle.text("Затраты, руб/час");
    yTitle.align("top");
    yTitle.orientation("top");
    yTitle.fontSize(15);
    yTitle.fontColor("black");
    var xTitle = chart.xAxis().title();
    xTitle.enabled(true);
    xTitle.text("Количество ремонтников");
    xTitle.align("right");
    xTitle.orientation("bottom");
    xTitle.fontSize(15);
    xTitle.fontColor("black");
    chart.title("");
    chart.title().align("center");
    chart.title().fontSize(25);
    chart.title().fontColor("black");
    chart.container("container").draw();

    $(".anychart-credits").hide();
}); */

const DEFAULT = {
    tno: 600,
    to: 8,
    N: 50,
    C1: 1,
    C2: 2,
    C3: 3,
    S1: 200,
    S: 1500,
    Nzn: 3,
};

interface InputError { label: string, message: string };

function MainPage() {
    const [errors, setErrors] = useState<InputError[]>([])
    const setError = (error: InputError) => setErrors((errors) => [...errors, error])
    const clearErrorsForInput = (label: string) => setErrors((errors) => errors.filter((error) => error.label !== label))

    const [tno, setTno] = useState(DEFAULT.tno)
    const onTnoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTno(Number(e.target.value))
    }

    const [to, setTo] = useState(DEFAULT.to)
    const onToChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTo(Number(e.target.value))
    }

    const [N, setN] = useState(DEFAULT.N)
    const onNChange = (e: ChangeEvent<HTMLInputElement>) => {
        const N = Number(e.target.value);

        if (N > 101) {
            return setError({ label: "N", message: "Слишком большое значение для N! Сделайте, пожалуйста, его меньше или равным 100" })
        }

        if (N < 0) {
            return setError({ label: "N", message: "Сделайте, пожалуйста, N неотрицательным" })
        }

        clearErrorsForInput('N')
        setN(N)
    }

    const [C1, setC1] = useState(DEFAULT.C1)
    const onC1Change = (e: ChangeEvent<HTMLInputElement>) => {
        setC1(Number(e.target.value))
    }

    const [C2, setC2] = useState(DEFAULT.C2)
    const onC2Change = (e: ChangeEvent<HTMLInputElement>) => {
        setC2(Number(e.target.value))
    }

    const [C3, setC3] = useState(DEFAULT.C3)
    const onC3Change = (e: ChangeEvent<HTMLInputElement>) => {
        setC3(Number(e.target.value))
    }

    const [S1, setS1] = useState(DEFAULT.S1)
    const onS1Change = (e: ChangeEvent<HTMLInputElement>) => {
        setS1(Number(e.target.value))
    }

    const [S, setS] = useState(DEFAULT.S)
    const onSChange = (e: ChangeEvent<HTMLInputElement>) => {
        setS(Number(e.target.value))
    }

    const [Nzn, setNzn] = useState(DEFAULT.Nzn)
    const onNznChange = (e: ChangeEvent<HTMLInputElement>) => {
        const Nzn = Number(e.target.value);

        if (Nzn > 10) {
            return setError({ label: "Nzn", message: "Слишком большое значение для Nzn! Сделайте, пожалуйста, его меньше 10" })
        }

        clearErrorsForInput('Nzn')
        setNzn(Nzn)
    }

    const w = to / tno;

    const formatValue = (value: number) => value.toFixed(Math.max(Nzn, 0))

    const CValues = [C1, C2, C3];

    const QValues = CValues.map((Ci) => mathQ(Ci, N, w));
    const LValues = CValues.map((Ci) => mathL(Ci, N, w));

    const UValues = CValues.map((_, i) => LValues[i] - QValues[i]);
    const poValues = CValues.map((Ci, i) => UValues[i] / Ci);
    const nValues = LValues.map((Li) => N - Li);

    const TpValues = LValues.map((Li) => mathTp({ L: Li, tno, N }));
    const TcValues = TpValues.map((Tpi) => mathTc(Tpi, tno));
    const peValues = TcValues.map((Tci) => mathPe(Tci, tno));
    const WValues = TpValues.map((Tpi) => mathW(Tpi, to));
    const YValues = CValues.map((Ci, i) => Ci * S1 + LValues[i] * S)

    const hasErrors = (label: string) => !!errors.find((error) => error.label === label);

    const data = useMemo(() => [{
        id: 'C-Y',
        data: [
            {
                x: C1,
                y: YValues[0]
            },
            {
                x: C2,
                y: YValues[1],
            },
            {
                x: C3,
                y: YValues[2]
            }
        ]
    }], [C1, C2, C3, YValues])

    return (
        <>
            <form className="read-the-docs">
                {[
                    { label: 'tno', value: tno, onChange: onTnoChange },
                    { label: "to", value: to, onChange: onToChange },
                    { label: "N", value: N, onChange: onNChange },
                    { label: "C1", value: C1, onChange: onC1Change },
                    { label: "C2", value: C2, onChange: onC2Change },
                    { label: "C3", value: C3, onChange: onC3Change },
                    { label: "S1", value: S1, onChange: onS1Change },
                    { label: "S", value: S, onChange: onSChange },
                    { label: "Nzn", value: Nzn, onChange: onNznChange },
                ].map((inputProps) => <Input isError={hasErrors(inputProps.label)} key={inputProps.label} {...inputProps} />)}
            </form>
            <table>
                <thead>
                    <Tr header={true} label="C" values={CValues} />
                </thead>

                <tbody>
                    <Tr formatValue={formatValue} label="Po" values={CValues.map((Ci) => mathP0(Ci, N, w))} />
                    <Tr formatValue={formatValue} label="Q" values={QValues} />
                    <Tr formatValue={formatValue} label="L" values={LValues} />

                    <Tr formatValue={formatValue} label="U" values={UValues} />
                    <Tr formatValue={formatValue} label="po" values={poValues} />
                    <Tr formatValue={formatValue} label="n" values={nValues} />

                    <Tr formatValue={formatValue} label="pe" values={peValues} />
                    <Tr formatValue={formatValue} label="W" values={WValues} />
                    <Tr formatValue={formatValue} label="Tp" values={TpValues} />
                    <Tr formatValue={formatValue} label="Tc" values={TcValues} />

                    <Tr formatValue={formatValue} label="pe/po" values={peValues.map((pei, i) => pei / poValues[i])} />

                    <Tr formatValue={formatValue} label="Y" values={YValues} />
                </tbody>
            </table>
            <Chart data={data} />
        </>
    )
}

const App = () => {
    switch (window.location.pathname) {
        case '/': return <TitlePage />
        case '/main': return <MainPage />
        default: return <span>key</span>
    }
}

export default App
