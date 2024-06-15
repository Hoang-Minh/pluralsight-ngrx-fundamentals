import { createReducer, on } from "@ngrx/store";
import { ProductsApiActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ProductsState extends EntityState<Product> {
    showProductionCode: boolean;
    loading: boolean;    
    errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

const initialState: ProductsState = adapter.getInitialState({
    showProductionCode: true,
    loading: false,    
    errorMessage: ''
});

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, state => ({
        ...state,
        showProductionCode: !state.showProductionCode
    })),
    on(ProductsPageActions.loadProducts, state => adapter.setAll([], {
        ...state,
        loading: true,        
        errorMessage: ''
    })),
    on(ProductsApiActions.productsLoadedSuccess, (state, {products}) => adapter.setAll(products,{
        ...state,
        loading: false        
    })),
    on(ProductsApiActions.productsLoadedFail, (state, {message}) => adapter.setAll([], {
        ...state,
        loading: false,        
        errorMessage: message
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsApiActions.productAddedSuccess, (state, {product}) => adapter.addOne(product, {
        ...state,
        loading: false        
    })),
    on(ProductsApiActions.productAddedFail, (state, {message}) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsApiActions.productUpdatedSuccess, (state, {update}) => adapter.updateOne(update, {
        ...state,
        loading: false        
    })),
    on(ProductsApiActions.productUpdatedFailure, (state, {message}) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsApiActions.productDeletedSuccess, (state, {id}) => adapter.removeOne(id, {
        ...state,
        loading: false        
    })),
    on(ProductsApiActions.productUpdatedFailure, (state, {message}) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
);

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;