import { createReducer, on } from "@ngrx/store";
import { ProductsApiActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProductionCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductsState = {
    showProductionCode: true,
    loading: false,
    products: [],
    errorMessage: ''
};

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, state => ({
        ...state,
        showProductionCode: !state.showProductionCode
    })),
    on(ProductsPageActions.loadProducts, state => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: ''
    })),
    on(ProductsApiActions.productsLoadedSuccess, (state, {products}) => ({
        ...state,
        loading: false,
        products
    })),
    on(ProductsApiActions.productsLoadedFail, (state, {message}) => ({
        ...state,
        loading: false,
        products: [],
        errorMessage: message
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsApiActions.productAddedSuccess, (state, {product}) => ({
        ...state,
        loading: false,
        products: [...state.products, product]
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
    on(ProductsApiActions.productUpdatedSuccess, (state, {product}) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) => existingProduct.id === product.id ? product : existingProduct)
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
    on(ProductsApiActions.productDeletedSuccess, (state, {id}) => ({
        ...state,
        loading: false,
        products: state.products.filter((existingProduct) => existingProduct.id !== id)
    })),
    on(ProductsApiActions.productUpdatedFailure, (state, {message}) => ({
        ...state,
        loading: false,
        errorMessage: message
    }))
);