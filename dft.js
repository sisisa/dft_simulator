let btn1 = document.querySelector('#get');
btn1.addEventListener('click', ()=> {
  let number_sel = document.querySelector('#sample_number');
  let P = Number(number_sel.value);

  let amr = new Array(8);
  let ami = new Array(8);
  amr[1] = Number(document.querySelector('#cos1').value);
  ami[1] = Number(document.querySelector('#sin1').value);
  amr[2] = Number(document.querySelector('#cos2').value);
  ami[2] = Number(document.querySelector('#sin2').value);
  amr[3] = Number(document.querySelector('#cos3').value);
  ami[3] = Number(document.querySelector('#sin3').value);
  amr[4] = Number(document.querySelector('#cos4').value);
  ami[4] = Number(document.querySelector('#sin4').value);
  amr[5] = Number(document.querySelector('#cos5').value);
  ami[5] = Number(document.querySelector('#sin5').value);
  amr[6] = Number(document.querySelector('#cos6').value);
  ami[6] = Number(document.querySelector('#sin6').value);
  amr[7] = Number(document.querySelector('#cos7').value);
  ami[7] = Number(document.querySelector('#sin7').value);

  console.log(amr);
  console.log(ami);
  // データサンプリング
  let f = new Array(P);
  for( let i=0; i<P; i++ )  f[i] = 0.0;
  let func_y = (x, amr, ami, freq) => ami*Math.sin(freq*x) + amr*Math.cos(freq*x);

  for( let i=1; i<8; i++ )
    for (let m = 0; m < P; m++)
      f[m] += func_y(((2.0 * Math.PI) / P) * m, amr[i], ami[i], i);
  let maxf = Math.max(...f,1.0);
  //console.log(f);
  //console.log(maxf);
  // 時間領域のグラフ描画
  let graph1 = document.querySelector('#fn');
  let g1 = graph1.getContext('2d');
  g1.beginPath();
  g1.clearRect(0,0,graph1.width, graph1.height);
  g1.moveTo( 0, 240 );

  g1.lineTo( 640, 240 );
  g1.stroke();
  g1.beginPath();
  g1.moveTo( 20, 240-f[0]*240/maxf );
  for( let x=1; x<P; x++ ) {
    g1.lineTo( x/P*600+20, 240-f[x]*240/maxf );
  }
  g1.stroke();

  // DFT係数計算
  let x = new Array(P);
  let ar = new Array(P);
  let ai = new Array(P);
  for (let n = 0; n < P; n++) {
    ar[n] = 0.0;
    ai[n] = 0.0;
    for (let m = 0; m < P; m++) {
      let x = ((2.0 * Math.PI) / P) * m * n;
      ar[n] += f[m] * Math.cos(-x);
      ai[n] += f[m] * Math.sin(-x);
    }
    ar[n] /= P;
    ai[n] /= P;
    x[n] = Math.sqrt(4.0 * ar[n] * ar[n] + 4.0 * ai[n] * ai[n]);
  }
  let maxx = Math.max(1.0,...x);
  console.log(maxx);
  // 周波数領域のグラフ描画（スカラー値のグラフ）
  let graph2 = document.querySelector('#am');
  let g2 = graph2.getContext('2d');
  g2.beginPath();
  g2.clearRect(0,0,graph2.width,graph2.height);
  g2.moveTo( 0, 460 );
  g2.lineTo(640,460 );
  g2.stroke();
  console.log(x);
  g2.beginPath();
  for( let m=1; m<P/2; m++ ) {
    g2.rect( 20+m*620/P, 460-x[m]*420/maxx, 620/P-2, x[m]*420/maxx );
  }
  g2.stroke();

    // 周波数領域のグラフ描画（実数部と虚数部が別々のグラフ）
  let max2 = Math.max(...ar,...ai);
  let max3 = Math.min(...ar,...ai);
  let max4 = Math.max( Math.abs(max2), Math.abs(max3),1.0 );

  let graph3 = document.querySelector('#am_complex');
  let g3 = graph3.getContext('2d');
  g3.beginPath();
  g3.clearRect(0,0,graph3.width,graph3.height);
  g3.moveTo( 0, 240 );
  g3.lineTo( 640, 240 );
  g3.stroke();

  g3.beginPath();
  for( let m=1; m<P; m++ ) {
    let m2=m-1;
    g3.rect( 20+m*620/P, 240-ar[m]*220/max4, 620/P*0.7-2, ar[m]*220/max4 );
    g3.rect( 20+m*620/P+(620/P)*0.3, 240-ai[m]*220/max4, 620/P*0.7-2, ai[m]*220/max4 );
  }
  g3.stroke();
});

document.querySelector('#view_normal').addEventListener('click', () => {
  document.querySelector('#am_complex').style.display="none";
  document.querySelector('#am').style.display="block";
});

document.querySelector('#view_complex').addEventListener('click', () => {
  document.querySelector('#am').style.display="none";
  document.querySelector('#am_complex').style.display="block";
});