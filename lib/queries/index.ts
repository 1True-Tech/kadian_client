import { categoryForShopList } from "./Category";
import { homepageHero, homePageLookBook, HomePageSpecialOffer, homePageStyleGuide } from "./HomepageContent";
import { shopCategory, shopCollection } from "./shop";
import { colors } from './Colors';
import { allCategories, categoryBySlug, searchCategories, homepageCategories } from './Categories';
import { allCollections, collectionBySlug, searchCollections } from './Collections';
import { productBySlugQuery, productFiltersQuery, productListQuery, productSearchQuery,allProductExtraFiltersQuery, productsByIdsQuery,productsOrdersQuery, productsByIdsQueryMini, productInventory, productCartItem } from "./products";
import { shippingCountriesQuery } from "./delivery";

const queries = {
    categoryForShopList,
    homepageHero,
    homePageLookBook,
    homePageStyleGuide,
    HomePageSpecialOffer,
    shopCategory,
    shopCollection,
    colors,
    productsOrdersQuery,
    // Category queries
    allCategories,
    categoryBySlug,
    searchCategories,
    homepageCategories,
    // Collection queries
    allCollections,
    collectionBySlug,
    searchCollections,

    // products
    productBySlugQuery,
    productListQuery,
    productFiltersQuery,
    productSearchQuery,
    allProductExtraFiltersQuery,
    productsByIdsQuery,
    productsByIdsQueryMini,
    productInventory,
    productCartItem,
    // delivery
    shippingCountriesQuery
}

export default queries;