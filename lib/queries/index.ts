import { categoryForShopList } from "./Category";
import { homepageHero, homePageLookBook, HomePageSpecialOffer, homePageStyleGuide } from "./HomepageContent";
import { shopCategory, shopCollection } from "./shop";
import { colors } from './Colors';
import { allCategories, categoryBySlug, searchCategories, homepageCategories } from './Categories';
import { allCollections, collectionBySlug, searchCollections } from './Collections';
import { productBySlugQuery, productFiltersQuery, productListQuery, productSearchQuery,allProductExtraFiltersQuery, productsByIdsQuery, productsByIdsQueryMini, productInventory, productCartItem } from "./products";

const queries = {
    categoryForShopList,
    homepageHero,
    homePageLookBook,
    homePageStyleGuide,
    HomePageSpecialOffer,
    shopCategory,
    shopCollection,
    colors,
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
    productCartItem
}

export default queries;