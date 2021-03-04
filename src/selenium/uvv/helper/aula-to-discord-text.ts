import { Aula } from '../models/aula';
import '../../../../libs/extensions/date';
export function print(Aula: Aula) {
  var texto = '```js\n';
  texto += '{\n';
  texto += '\tMateria : "' + diaMateria(Aula.materia) + '"\n';
  texto += '\tHorario : "' + Aula?.horario?.slice(0, 5).trim() + '"\n';
  texto += '\tDia : "' + Aula?.data?.EmailDate() + ' (' + Aula?.data?.BrazilDate() + ')' + '"\n';
  texto += '\tLink : \n';
  texto += '}';
  texto += '```';
  texto += Aula?.link + '\n';
  return texto;
}
function diaMateria(texto) {
  var index = texto?.indexOf('no dia');
  texto = texto?.replace(':', '-');
  return texto?.substring(0, index);
}
