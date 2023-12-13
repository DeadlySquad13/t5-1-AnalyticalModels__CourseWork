import { ChangeEvent, useState } from 'react'
import { Input } from '../input/input';
import { Tr } from '../table/tr';
import '../App.css'

// FIX: Limit.
function factorial(n: number): number {
    if (n <= 0) return 1;

    return n ? n * factorial(n - 1) : 1;
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
    N: 10,
    tk: 3,
    td: 15,
    T0: 50,
    C: 3,
    m: 2,
    Tp: 100,
    tpr: 20,
    gamma: 0,
    K1: 0.995,
    delta: 0.05,
    K2: 100,
    Nzn: 3,
};

interface InputError { label: string, message: string }

const MAX_ITERATIONS = 99999;

export function ServerPage() {
    const [errors, setErrors] = useState<InputError[]>([])
    const setError = (error: InputError) => setErrors((errors) => [...errors, error])
    const clearErrorsForInput = (label: string) => setErrors((errors) => errors.filter((error) => error.label !== label))

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

    const [tk, setTk] = useState(DEFAULT.tk)
    const onTkChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTk(Number(e.target.value))
    }

    const [td, setTd] = useState(DEFAULT.td)
    const onTdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTd(Number(e.target.value))
    }

    const [T0, setT0] = useState(DEFAULT.T0)
    const onT0Change = (e: ChangeEvent<HTMLInputElement>) => {
        setT0(Number(e.target.value))
    }

    const [C, setC] = useState(DEFAULT.C)
    const onCChange = (e: ChangeEvent<HTMLInputElement>) => {
        setC(Number(e.target.value))
    }

    const [m, setM] = useState(DEFAULT.m)
    const onMChange = (e: ChangeEvent<HTMLInputElement>) => {
        setM(Number(e.target.value))
    }

    const [Tp, setTp] = useState(DEFAULT.Tp)
    const onTpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTp(Number(e.target.value))
    }

    const [tpr, setTpr] = useState(DEFAULT.tpr)
    const onTprChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTpr(Number(e.target.value))
    }

    const [gamma, setGamma] = useState(DEFAULT.gamma)
    const onGammaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGamma(Number(e.target.value))
    }

    const [K1, setK1] = useState(DEFAULT.K1)
    const onK1Change = (e: ChangeEvent<HTMLInputElement>) => {
        setK1(Number(e.target.value))
    }

    const [delta, setDelta] = useState(DEFAULT.delta)
    const onDeltaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDelta(Number(e.target.value))
    }

    const [K2, setK2] = useState(DEFAULT.K2)
    const onK2Change = (e: ChangeEvent<HTMLInputElement>) => {
        setK2(Number(e.target.value))
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

    const formatValue = (value: number) => value.toFixed(Math.max(Nzn, 0))

    const hasErrors = (label: string) => !!errors.find((error) => error.label === label);

    const Pi = 1 / m;
    const B = 1 / (1 - gamma);
    const m1 = 1 / (2*tk);
    const m2 = C / (B*tpr);
    const m3 = 1 / (B*Pi*td);
    const m4 = (N - 1) / N
    const min = Math.min(m1, m2, m3)
    let Lf1 = K1 * min * m4

    const Lstart = Lf1;
    let Tk = 0;
    let Tpr = 0;
    let Td = 0;
    let n = 0;
    let Lf = 0;

    while (true) {
        n++;
        Tk = (2*tk) / (1 - 2*Lf1*tk)
        const Tnpsub = (B * Lf1 * tpr / C)**C;
        Tpr = (B*tpr) / (1 - Tnpsub);
        Td = (B*td) / (1 - B*Pi*Lf1*td);

        Lf = (N-1)/(T0 + Tp + Tk + Tpr + Td);
        const d = Math.abs(Lf1 - Lf) / Lf;

        if (d < delta || n == MAX_ITERATIONS) {
            break;
        }

        Lf1 = Lf1 - (Lf1 - Lf) / K2;
    }

    const Tcycle = T0+Tp+Tk+Tpr+Td;
    const Treac = Tcycle - Tp;

    const rok = 2 * N / Tcycle * tk;

    const ropr = B * N / Tcycle * tpr / C;

    const rod = B * N / Tcycle * Pi * td;


    const stationLoad = (T0 + Tp) / Tcycle;
    const loadOfStationUser = Tp / Tcycle;
    const meanWorkingComputers = N * (T0 + Tp) / Tcycle

    return (
        <>
            <h3>Выполнил: Пакало Александр Сергеевич, студент ИУ5-12М</h3>
            <form className="read-the-docs">
                <h3 style={{ marginBottom: 0 }}>Входные данные</h3>
                <span>{[
                    { description: '', label: 'N', value: N, onChange: onNChange },
                    { description: '', label: "tk", value: tk, onChange: onTkChange },
                    { description: '', label: "tд", value: td, onChange: onTdChange },
                    { description: '', label: "T0", value: T0, onChange: onT0Change },
                    { description: '', label: "C", value: C, onChange: onCChange },
                    { description: '', label: "m", value: m, onChange: onMChange },
                    { description: '', label: "Tp", value: Tp, onChange: onTpChange },
                    { description: '', label: "tпр", value: tpr, onChange: onTprChange },
                    { description: '', label: "gamma", value: gamma, onChange: onGammaChange },
                ].map((inputProps) => <Input isError={hasErrors(inputProps.label)} key={inputProps.label} {...inputProps} />)
                }</span>
                <h3 style={{ marginBottom: 0 }}>Параметры управления</h3>
                <h4 style={{ marginTop: 0, marginBottom: 0 }}>Точность вычислений</h4>
                <span>{[
                    { label: 'K1', value: K1, onChange: onK1Change },
                    { label: "K2", value: K2, onChange: onK2Change },
                    { label: "delta", value: delta, onChange: onDeltaChange },
                    { description: 'Количество знаков после запятой', label: "Nзн", value: Nzn, onChange: onNznChange },
                ].map((inputProps) => <Input isError={hasErrors(`C${inputProps.label}`)} key={inputProps.label} {...inputProps} />)}
                </span>
            </form >
            <table>
                <thead>
                    <Tr description="Описание" header={true} label="Параметр" values={["Значение"]} />
                </thead>

                <tbody>
                    <Tr description="Загрузка рабочей станции" formatValue={formatValue} label="Po" values={[stationLoad]} />
                    <Tr description="Загрузка пользователя рабочей станции" formatValue={formatValue} label="Q" values={[loadOfStationUser]} />
                    <Tr description="Ср. количество работающих PC" formatValue={formatValue} label="L" values={[meanWorkingComputers]} />

                    <Tr description="Загрузка канала" formatValue={formatValue} label="U" values={[rok]} />
                    <Tr description="Загрузка процессора" formatValue={formatValue} label="po" values={[ropr]} />
                    <Tr description="Загрузка дисков" formatValue={formatValue} label="n" values={[rod]} />

                    <Tr description="Ср. время цикла системы" formatValue={formatValue} label="pe" values={[Tcycle]} />
                    <Tr description="Ср. время реакции системы" formatValue={formatValue} label="W" values={[Treac]} />

                    <Tr description="Начальная интенсивность фонового потока" formatValue={formatValue} label="Tp" values={[Lstart]} />
                    <Tr description="Конечная интенсивность фонового потока" formatValue={formatValue} label="Tc" values={[Lf1]} />

                    <Tr description="Количество итераций" label="Y" values={[n]} />
                </tbody>
            </table>
        </>
    )
}
