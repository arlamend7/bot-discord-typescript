import { print } from '../../src/selenium/uvv/helper/aula-to-discord-text';
import { Aula } from '../../src/selenium/uvv/models/aula';

test('teste texto', () => {
  expect(print(new Aula())).not.toBe("");
});
