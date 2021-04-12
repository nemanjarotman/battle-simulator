class Unit {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.rechargeTime = 1000 * this.health / 100;
    this.damage = this.health / 100;
    this.criticalChance = 10 - this.health / 10;
  }

  attack(unit){
    if (this.criticalChance >= Math.random() * 101) 
      unit.health = unit.health - this.damage * 2;
    unit.health = unit.health - this.damage;

    unit.rechargeTime = 1000 * unit.health / 100;
    unit.damage = unit.health / 100;
    unit.criticalChance = 10 - unit.health / 10;
  }
}

const unitNames = ['first', 'second', 'third', 'fourth', 'fifth'];

let units = unitNames.map(name => new Unit(name));

const getUnit = (n) => {
  let result = Math.floor(Math.random() * units.length);
  if (result === n || units[result].health < 0) { 
    return getUnit(n);
  }
  return units[result];
}

const fight = (n) => {
  let fighter = units[n];
  let target = getUnit(n);
  fighter.attack(target);
  console.log(units);
}

let count = units.length;

let intervals = units.map((interval, index) => {
  setInterval(() => {
    if (units[index].health <= 0 || count === 1) {
      count--;
      clearInterval(interval);
    }
    fight(index);
  }, units[index].rechargeTime);
});
