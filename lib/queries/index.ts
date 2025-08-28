import { categoryForShopList } from "./Category";
import { homepageHero, homePageLookBook, HomePageSpecialOffer, homePageStyleGuide } from "./HomepageContent";
import { shopCategory, shopCollection } from "./shop";
import { colors } from './Colors';
import { allCategories, categoryBySlug, searchCategories, homepageCategories } from './Categories';
import { allCollections, collectionBySlug, searchCollections } from './Collections';

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
    searchCollections
}

export default queries;