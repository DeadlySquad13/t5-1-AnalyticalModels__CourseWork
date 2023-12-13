import { ChangeEvent, useState } from 'react'
import { Input } from '../input/input';
import { Tr } from '../table/tr';
import '../App.css'

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

const K1_MIN = 0.9;
const K1_MAX = 0.999995;

const DELTA_MIN = 0.000001;
const DELTA_MAX = 0.9;

const K2_MIN = 10;
const K2_MAX = 100000;

export function ServerPage() {
    const [errors, setErrors] = useState<InputError[]>([])
    const setError = (error: InputError) => setErrors((errors) => [...errors, error])
    const clearErrorsForInput = (label: string) => setErrors((errors) => errors.filter((error) => error.label !== label))

    const [N, setN] = useState(DEFAULT.N)
    const onNChange = (e: ChangeEvent<HTMLInputElement>) => {
        setN(Number(e.target.value))
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
        const K1 = Number(e.target.value)

        if (K1 < K1_MIN || K1 > K1_MAX) {
            return setError({ label: "K1", message: `Недопустимое значение! Установите K1 в пределах [${K1_MIN}, ${K1_MAX}]` });
        }

        clearErrorsForInput('K1');
        setK1(K1);
    }

    const [delta, setDelta] = useState(DEFAULT.delta)
    const onDeltaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const delta = Number(e.target.value)

        if (delta < DELTA_MIN || delta > DELTA_MAX) {
            return setError({ label: "delta", message: `Недопустимое значение! Установите delta в пределах [${DELTA_MIN}, ${DELTA_MAX}]`});
        }

        clearErrorsForInput("delta")
        setDelta(delta);
    }

    const [K2, setK2] = useState(DEFAULT.K2)
    const onK2Change = (e: ChangeEvent<HTMLInputElement>) => {
        const K2 = Number(e.target.value)

        if (K2 < K2_MIN || K2 > K2_MAX) {
            return setError({ label: "K2", message: `Недопустимое значение! Установите K2 в пределах [${K2_MIN}, ${K2_MAX}]` });
        }

        clearErrorsForInput('K2');
        setK2(K2);
    }

    const [Nzn, setNzn] = useState(DEFAULT.Nzn)
    const onNznChange = (e: ChangeEvent<HTMLInputElement>) => {
        const Nzn = Number(e.target.value);

        if (Nzn > 10) {
            return setError({ label: "Nzn", message: "Слишком большое значение для Nzn! Сделайте, пожалуйста, его меньше 10" })
        }

        if (Nzn < 1) {
            return setError({ label: "Nzn", message: "Слишком малое значение для Nzn! Сделайте, пожалуйста, его больше 1" })
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
                    { description: '', id: 'N', value: N, onChange: onNChange },
                    { description: '', id: "tk", label: 't_k', value: tk, onChange: onTkChange },
                    { description: '', id: "td", label: 't_д', value: td, onChange: onTdChange },
                    { description: '', id: "T0", label: 'T_0', value: T0, onChange: onT0Change },
                    { description: '', id: "C", value: C, onChange: onCChange },
                    { description: '', id: "m", value: m, onChange: onMChange },
                    { description: '', id: "Tp", label: 'T_p', value: Tp, onChange: onTpChange },
                    { description: '', id: "tpr", label: 't_пр', value: tpr, onChange: onTprChange },
                    { description: '', id: "gamma", label: 'γ', value: gamma, onChange: onGammaChange },
                ].map((inputProps) => <Input isError={hasErrors(inputProps.id)} key={inputProps.id} {...inputProps} />)
                }</span>
                <h3 style={{ marginBottom: 0 }}>Параметры управления</h3>
                <h4 style={{ marginTop: 0, marginBottom: 0 }}>Точность вычислений</h4>
                <span>{[
                    { id: 'K1', label: 'K_1', value: K1, onChange: onK1Change, step: 0.001 },
                    { id: "K2", label: 'K_2', value: K2, onChange: onK2Change, step: 10 },
                    { id: "delta", label: 'Δ', value: delta, onChange: onDeltaChange, step: 0.01 },
                    { description: 'Количество знаков после запятой', id: "Nzn", label: 'N_зн', value: Nzn, onChange: onNznChange},
                ].map((inputProps) => <Input  isError={hasErrors(inputProps.id)} key={inputProps.id} {...inputProps} />)}
                </span>
            </form >
            <table>
                <thead>
                    <Tr description="Описание" header={true} label="Параметр" values={["Значение"]} />
                </thead>

                <tbody>
                    <Tr description="Загрузка рабочей станции" formatValue={formatValue} label="P_0" values={[stationLoad]} />
                    <Tr description="Загрузка пользователя рабочей станции" formatValue={formatValue} label="Q" values={[loadOfStationUser]} />
                    <Tr description="Ср. количество работающих PC" formatValue={formatValue} label="L" values={[meanWorkingComputers]} />

                    <Tr description="Загрузка канала" formatValue={formatValue} label="U" values={[rok]} />
                    <Tr description="Загрузка процессора" formatValue={formatValue} label="p_o" values={[ropr]} />
                    <Tr description="Загрузка дисков" formatValue={formatValue} label="n" values={[rod]} />

                    <Tr description="Ср. время цикла системы" formatValue={formatValue} label="p_e" values={[Tcycle]} />
                    <Tr description="Ср. время реакции системы" formatValue={formatValue} label="W" values={[Treac]} />

                    <Tr description="Начальная интенсивность фонового потока" formatValue={formatValue} label="T_p" values={[Lstart]} />
                    <Tr description="Конечная интенсивность фонового потока" formatValue={formatValue} label="T_c" values={[Lf1]} />

                    <Tr description="Количество итераций" label="Y" values={[n]} />
                </tbody>
            </table>
        </>
    )
}
