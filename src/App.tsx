import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Input } from './input/input';
import { Tr } from './table/tr';
import './App.css'

function factorial(n) {
    if (n == 0) return 1;
    return n ? n * factorial(n - 1) : 1;
}

function mathP0(c, N, w) {
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

function mathQ(c, N, w) {
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

function mathL(c, N, w) {
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

    n = c;

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

/* $("#iNzn").hover(
    function () {
        $("#obozn").html(
            "Количество знаков после запятой в результатах вывода"
        );
    },
    function () {
        $("#obozn").html("");
    }
);
$("#iC").hover(
    function () {
        $("#obozn").html("Количество ремонтников в 1 эксперименте");
    },
    function () {
        $("#obozn").html("");
    }
);
$("#iC2").hover(
    function () {
        $("#obozn").html("Количество ремонтников в 2 эксперименте");
    },
    function () {
        $("#obozn").html("");
    }
);
$("#iC3").hover(
    function () {
        $("#obozn").html("Количество ремонтников в 3 эксперименте");
    },
    function () {
        $("#obozn").html("");
    }
);

$(".labelForResOutput").hover(
    function () {
        $("#obozn").html($(this).attr("name"));
    },
    function () {
        $("#obozn").html("");
    }
); */

/* $("#go").click(function () {
    var tno = +$("#tno").val();
    var to = +$("#to").val();
    var N = +$("#N").val();
    var C = +$("#C").val();
    var C2 = +$("#C2").val();
    var C3 = +$("#C3").val();
    var S1 = +$("#S1").val();
    var S = +$("#S").val();
    var Nzn = +$("#Nzn").val();

    var w = to / tno; //1 .toFixed(Nzn)
    var Po = mathP0(C, N, w);
    var Q = mathQ(C, N, w);
    var L = mathL(C, N, w);
    $("#Po").html(Po.toFixed(Nzn));
    $("#Q").html(Q.toFixed(Nzn));
    $("#L").html(L.toFixed(Nzn));
    $("#c").html(C.toFixed(0));
    var U = L - Q;
    var po = U / C;
    var n = N - L;
    $("#n").html(n.toFixed(Nzn));
    $("#U").html(U.toFixed(Nzn));
    $("#po").html(po.toFixed(Nzn));
    var Tp = (L * tno) / (N - L);
    var Tc = Tp + tno;
    var pe = tno / Tc;
    var W = Tp - to;
    $("#pe").html(pe.toFixed(Nzn));
    $("#W").html(W.toFixed(Nzn));
    $("#Tp").html(Tp.toFixed(Nzn));
    $("#Tc").html(Tc.toFixed(Nzn));
    $("#drob").html((pe / po).toFixed(Nzn));
    var Y = C * S1 + L * S;
    var y1 = Y;
    $("#Y").html(Y.toFixed(0));

    Po = mathP0(C2, N, w); //2
    Q = mathQ(C2, N, w);
    L = mathL(C2, N, w);
    $("#Po2").html(Po.toFixed(Nzn));
    $("#Q2").html(Q.toFixed(Nzn));
    $("#L2").html(L.toFixed(Nzn));
    $("#c2").html(C2.toFixed(0));
    U = L - Q;
    po = U / C2;
    n = N - L;
    $("#n2").html(n.toFixed(Nzn));
    $("#U2").html(U.toFixed(Nzn));
    $("#po2").html(po.toFixed(Nzn));
    Tp = (L * tno) / (N - L);
    Tc = Tp + tno;
    pe = tno / Tc;
    W = Tp - to;
    $("#pe2").html(pe.toFixed(Nzn));
    $("#W2").html(W.toFixed(Nzn));
    $("#Tp2").html(Tp.toFixed(Nzn));
    $("#Tc2").html(Tc.toFixed(Nzn));
    $("#drob2").html((pe / po).toFixed(Nzn));
    Y = C2 * S1 + L * S;
    var y2 = Y;
    $("#Y2").html(Y.toFixed(0));

    Po = mathP0(C3, N, w); //3
    Q = mathQ(C3, N, w);
    L = mathL(C3, N, w);
    $("#Po3").html(Po.toFixed(Nzn));
    $("#Q3").html(Q.toFixed(Nzn));
    $("#L3").html(L.toFixed(Nzn));
    $("#c3").html(C3.toFixed(0));
    U = L - Q;
    po = U / C3;
    n = N - L;
    $("#n3").html(n.toFixed(Nzn));
    $("#U3").html(U.toFixed(Nzn));
    $("#po3").html(po.toFixed(Nzn));
    Tp = (L * tno) / (N - L);
    Tc = Tp + tno;
    pe = tno / Tc;
    W = Tp - to;
    $("#pe3").html(pe.toFixed(Nzn));
    $("#W3").html(W.toFixed(Nzn));
    $("#Tp3").html(Tp.toFixed(Nzn));
    $("#Tc3").html(Tc.toFixed(Nzn));
    $("#drob3").html((pe / po).toFixed(Nzn));
    Y = C3 * S1 + L * S;
    var y3 = Y;
    $("#Y3").html(Y.toFixed(0));

    $("#Y").css("background", "white");
    $("#Y2").css("background", "white");
    $("#Y3").css("background", "white");
    var cif = [y1, y2, y3].indexOf(Math.min.apply(null, [y1, y2, y3])) + 1;
    if (cif == 1) cif = "";
    $("#Y" + cif).css("background", "#1d7874");

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

function App() {
  const [count, setCount] = useState(0)

  const [tno, setTno] = useState(150)
  const onTnoChange = (e: React) => {
    setTno(Number(e.target.value))
  }

  const [to, setTo] = useState(15)
  const onToChange = (e: React) => {
    setTo(Number(e.target.value))
  }

  const [N, setN] = useState(10)
  const onNChange = (e: React) => {
    setN(Number(e.target.value))
  }

  const [C1, setC1] = useState(2)
  const onC1Change = (e: React) => {
    setC1(Number(e.target.value))
  }

  const [C2, setC2] = useState(3)
  const onC2Change = (e: React) => {
    setC2(Number(e.target.value))
  }

  const [C3, setC3] = useState(4)
  const onC3Change = (e: React) => {
    setC3(Number(e.target.value))
  }

  const [S1, setS1] = useState(250)
  const onS1Change = (e: React) => {
    setS1(Number(e.target.value))
  }

  const [S, setS] = useState(1000)
  const onSChange = (e: React) => {
    setS(Number(e.target.value))
  }

  const [Nzn, setNzn] = useState(5)
  const onNznChange = (e: React) => {
    setNzn(Number(e.target.value))
  }

  useEffect(() => {
    console.log({ tno })
  }, [tno])

    const w = to / tno;

    const formatValue = (value: number) => value.toFixed(Math.max(Nzn, 0))

  return (
    <>
      <form className="read-the-docs">
        <Input type="number" label="tno" value={tno} onChange={onTnoChange}/>
        <Input type="number" label="to" value={to} onChange={onToChange}/>
        <Input type="number" label="N" value={N} onChange={onNChange}/>
        <Input type="number" label="C1" value={C1} onChange={onC1Change}/>
        <Input type="number" label="C2" value={C2} onChange={onC2Change}/>
        <Input type="number" label="C3" value={C3} onChange={onC3Change}/>
        <Input type="number" label="S1" value={S1} onChange={onS1Change}/>
        <Input type="number" label="S" value={S} onChange={onSChange}/>
        <Input type="number" label="Nzn" value={Nzn} onChange={onNznChange}/>
      </form>
      <table>
        <Tr header={true} label="C" values={[C1, C2, C3]} />
        <Tr formatValue={formatValue} label="w" values={[w]} />
        <Tr formatValue={formatValue} label="Po" values={[mathP0(C1, N, w)]} />
        <Tr formatValue={formatValue} label="Q" values={[N]} />
        <Tr formatValue={formatValue} label="L" values={[N]} />
        <Tr formatValue={formatValue} label="U" values={[N]} />
        <Tr formatValue={formatValue} label="po" values={[N]} />
        <Tr formatValue={formatValue} label="n" values={[N]} />
        <Tr formatValue={formatValue} label="pe" values={[N]} />
        <Tr formatValue={formatValue} label="W" values={[N]} />
        <Tr formatValue={formatValue} label="Tp" values={[N]} />
        <Tr formatValue={formatValue} label="Tc" values={[N]} />
        <Tr formatValue={formatValue} label="pe/po" values={[N]} />
        <Tr formatValue={formatValue} label="Y" values={[N]} />
      </table>
    </>
  )
}

export default App
