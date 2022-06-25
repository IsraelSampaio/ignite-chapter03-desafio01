import { format as DateFnsFormat } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function dateFormat(date: number | Date, format: string): string {
  return DateFnsFormat(date, format, {
    locale: ptBR,
  });
}
