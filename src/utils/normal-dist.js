// based on http://stackoverflow.com/questions/34035015/how-to-draw-a-normal-distribution-curve-bell-curve-using-css-and-javascript

export function NormalDensityZx(x, Mean, StdDev) {
  const a = x - Mean;
  return Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev);
}
//----------------------------------------------------------------------------------------------
// Calculates Q(x), the right tail area under the Standard Normal Curve.
function StandardNormalQx(x) {
  if (x === 0) // no approximation necessary for 0
    { return 0.50; }

  let t1,
    t2,
    t3,
    t4,
    t5,
    qx;
  let negative = false;
  if (x < 0) {
    x = -x;
    negative = true;
  }
  t1 = 1 / (1 + (0.2316419 * x));
  t2 = t1 * t1;
  t3 = t2 * t1;
  t4 = t3 * t1;
  t5 = t4 * t1;
  qx = NormalDensityZx(x, 0, 1) * ((0.319381530 * t1) + (-0.356563782 * t2) +
    (1.781477937 * t3) + (-1.821255978 * t4) + (1.330274429 * t5));
  if (negative == true) { qx = 1 - qx; }
  return qx;
}
//----------------------------------------------------------------------------------------------
// Calculates P(x), the left tail area under the Standard Normal Curve, which is 1 - Q(x).
function StandardNormalPx(x) {
  return 1 - StandardNormalQx(x);
}
//----------------------------------------------------------------------------------------------
// Calculates A(x), the area under the Standard Normal Curve between +x and -x.
function StandardNormalAx(x) {
  return 1 - (2 * StandardNormalQx(Math.abs(x)));
}
