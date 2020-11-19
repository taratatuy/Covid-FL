class StartRegion {
  constructor(p, e) {
    this.p = p;
    this.e = e;
    this.label = null;
  }

  Mu(x) {
    let output = 1;
    if (x > this.p) output = this._fall(x);

    if (output < 0) output = 0;
    return output;
  }

  _fall(x) {
    return (this.e - x) / (this.e - this.p);
  }

  getAvgY(mu) {
    return this.e - mu * (this.e - this.p);
  }

  setLabel(label) {
    this.label = label;
  }
}

// const r = new StartRegion(0, 2);

// console.log(r.Mu(3));
// console.log(r.getAvgY(0.5));
