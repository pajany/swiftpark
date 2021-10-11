import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { TableService ,TableResponseModel, ITableState, BaseModel } from 'src/app/_metronic/shared/crud-table';
 import { Managefaq } from '../_models/Managefaq.model';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
 import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ManagefaqService extends TableService<Managefaq> implements OnDestroy {
  //API_URL = `${environment.apiUrl}/products`;
  API_URL = `${environment.apiUrl}/customer`;
   constructor(@Inject(HttpClient) http) {
    super(http);
  }

  // READ
  find(tableState: ITableState): Observable<TableResponseModel<Managefaq>> {
    return this.http.get<Managefaq[]>(this.API_URL).pipe(
      map((response: Managefaq[]) => {
        const filteredResult = baseFilter(response, tableState);
        
        const result: TableResponseModel<Managefaq> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
        
      })
    );
  }

  deleteItems(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    ids.forEach(id => {
      tasks$.push(this.delete(id));
    });
    return forkJoin(tasks$);
  }

  updateStatusForItems(ids: number[], status: number): Observable<any> {
    return this.http.get<Managefaq[]>(this.API_URL).pipe(
      map((managefaq: Managefaq[]) => {
        return managefaq.filter(c => ids.indexOf(c.id) > -1).map(c => {
          //c.status = status;
          return c;
        });
      }),
      exhaustMap((managefaqs: Managefaq[]) => {
        const tasks$ = [];
        managefaqs.forEach(managefaq => {
          tasks$.push(this.update(managefaq));
        });
        return forkJoin(tasks$);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
