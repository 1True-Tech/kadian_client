import queries from "@/lib/queries";
import { client } from "@/lib/utils/NSClient";
import { Color } from "@/types/structures";
import { FiltersRaw, FiltersReady } from "@/types/structures/filters";

export async function processAvailableFilters(): Promise<FiltersReady> {
    const data = await client.fetch<FiltersRaw[]>(queries.allProductExtraFiltersQuery);
    const maxPrice = Math.max(...data.map(d=>Math.max(...d.prices.prices)).filter(p=>!isNaN(p)));
    const colors = data.filter(d => d.colors).flatMap(d=>d.colors);
    const brands = data.filter(d => d.brand).map(d=>d.brand);
    const categories = data.filter(d => d.category).map(d=>d.category);
    const sizes = Array.from(new Set(data.flatMap(d=>d.sizes).map(s=>s.label))).sort((a,b)=>a.localeCompare(b));
    const materials = Array.from(new Set(data.flatMap(d=>d.materials).map(m=>m.name))).sort((a,b)=>a.localeCompare(b));

    return {
        maxPrice,
        colors: Array.from(new Set(colors.map(c=>c.name))).map(name=>colors.find(c=>c.name===name)) as Color[],
        brands: Array.from(new Set(brands.map(b=>b.name))).map(name=>brands.find(b=>b.name===name)) as {name:string,slug:string}[],
        categories: Array.from(new Set(categories.map(c=>c.name))).map(name=>categories.find(c=>c.name===name)) as {name:string,slug:string}[],
        sizes,
        materials
    }
}