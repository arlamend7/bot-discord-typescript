import { print } from '../../src/uvv/helper/aula-to-discord-text';
import { Aula } from '../../src/uvv/models/aula';

test('teste texto', () => {
  expect(print(new Aula())).not.toBe("");
});
