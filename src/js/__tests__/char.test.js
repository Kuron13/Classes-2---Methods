import createCharacter, { Character, Swordsman} from '../app.js'

let testChar = new Character('test', 'Bowman', 25, 25);

const charList = [
  ['Лучник', 'Bowman', {name: 'Лучник', type: 'Bowman', health: 100, level: 1, attack: 25, defence: 25}],
  ['Мечник', 'Swordsman', {name: 'Мечник', type: 'Swordsman', health: 100, level: 1, attack: 40, defence: 10}],
  ['Маг', 'Magician', {name: 'Маг', type: 'Magician', health: 100, level: 1, attack: 10, defence: 40}],
  ['Нежить', 'Undead', {name: 'Нежить', type: 'Undead', health: 100, level: 1, attack: 25, defence: 25}],
  ['Зомби', 'Zombie', {name: 'Зомби', type: 'Zombie', health: 100, level: 1, attack: 40, defence: 10}],
  ['Демон', 'Daemon', {name: 'Демон', type: 'Daemon', health: 100, level: 1, attack: 10, defence: 40}]
]

const createErrorsList = [
  ['Я', 'Swordsman', "Неверные данные. Имя должно содержать 2-10 символов."],
  ['Великий мастер', 'Magician', "Неверные данные. Имя должно содержать 2-10 символов."],
  ['Лучший', 'Cobold', "Неверные данные. Такого типа персонажа не существует."],
]
  
const levelUpErrorsList = [
  ['Обморок', 0, "Нельзя повысить уровень мёртвому персонажу."],
  ['Мёртв', -15, "Нельзя повысить уровень мёртвому персонажу."]
]

test.each(charList)('Testing create character %n with type %t', (name, type, expected) => {
  expected.levelUp = testChar.levelUp
  expected.damage = testChar.damage
  const result = createCharacter(name, type);
  const expectedObj = [expected.data, type]
  const resultObj = [result.data, result.constructor.name]
  expect(resultObj).toEqual(expectedObj);
});

test("Testing character's levelUp", () => {
  const level1 = new Swordsman('Уровень');
  level1['health'] = 30
  const correctLevel2 = {name: 'Уровень', type: 'Swordsman', health: 100, level: 2, attack: 48, defence: 12};
  correctLevel2.levelUp = level1.levelUp
  correctLevel2.damage = level1.damage
  level1.levelUp();
  const result = level1
  expect(result).toEqual(correctLevel2);
});

test("Testing character's damage with 20 points", () => {
  const healthy = new Swordsman('Удар')
  const wounded = {name: 'Удар', type: 'Swordsman', health: 82, level: 1, attack: 40, defence: 10}
  wounded.levelUp = healthy.levelUp
  wounded.damage = healthy.damage
  healthy.damage(20)
  const result = healthy
  expect(result).toEqual(wounded);
});

test.each(createErrorsList)('Testing create Character %n with type %t with error', (name, type, expected) => {
  expect(() => createCharacter(name, type)).toThrow(expected);
});

test.each(createErrorsList)('Testing create Character in Class with type %t with error', (name, type, expected) => {
  expect(() => new Character(name, type, 20, 20)).toThrow(expected);
});

test.each(levelUpErrorsList)("Testing character's %n, levelUp with error: with health %h", (name, health, expected) => {
  const result = new Swordsman(name);
  result['health'] = health
  expect(() => result.levelUp()).toThrow(expected);
});

test("Testing character's damage with 20 points with error: health -15", () => {
  const result = new Swordsman('Мёртв');
  result['health'] = -15
  expect(() => result.damage()).toThrow("Персонаж уже мёртв.");
});