import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from './Cliente';

@Pipe({
  name: 'filter',
  standalone: true,
 
})
export class FilterPipe implements PipeTransform {
  transform(items: Cliente[], searchText: string): Cliente[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.nome.toLowerCase().includes(searchText);
    });
  }
}
