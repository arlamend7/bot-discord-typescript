import { enviroment } from '@environments';
import { print } from 'src/uvv/helper/aula-to-discord-text';
import { Aula } from 'src/uvv/models/aula';
describe("algumas",() => {
  test('teste texto', () => {
    expect(print(new Aula())).not.toBe("");
  });
  test('enviroments', () => {
    expect(enviroment).toBe({base : "dev"});
  });
})