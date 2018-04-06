function yield (age, purchase) {

    const perc = 1.05,
          max = 68;

    return purchase * Math.pow(perc, (max - age));
}
