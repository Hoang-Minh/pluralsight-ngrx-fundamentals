import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {


  ngrxOnInitEffects() {

    return ProductsPageActions.loadProducts();
  }  

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productService.getAll().pipe(
          map((products) =>
            ProductsApiActions.productsLoadedSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsApiActions.productsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({product}) =>
        this.productService.add(product).pipe(
          map((newProduct) =>
            ProductsApiActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsApiActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({product}) =>
        this.productService.update(product).pipe(
          map((product) =>
            ProductsApiActions.productUpdatedSuccess({ product })
          ),
          catchError((error) =>
            of(ProductsApiActions.productUpdatedFailure({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({id}) =>
        this.productService.delete(id).pipe(
          map(() =>
            ProductsApiActions.productDeletedSuccess({ id })
          ),
          catchError((error) =>
            of(ProductsApiActions.productDeletedFailure({ message: error }))
          )
        )
      )
    )
  );

  // redirectToProductsPage = createEffect(() => this.actions$.pipe(
  //   ofType(ProductsApiActions.productAddedSuccess, 
  //     ProductsApiActions.productUpdatedSuccess, 
  //     ProductsApiActions.productDeletedSuccess),
  //   tap(() => this.router.navigate(['/products']))
  // ), {dispatch: false} );

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private router: Router
  ) {}
}
