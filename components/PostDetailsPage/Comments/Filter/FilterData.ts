export enum FilterOptionEnum {
    Native = "Native",
    Newest = "Newest",
    Oldest = "Oldest",
    MostLiked = "MostLiked",
    LeastLiked = "LeastLiked"
}

type FilterOptionValue = keyof typeof FilterOptionEnum

export type Option = {
    value: string
    text: string
}

export type FilterBody = {
    postId: string
    filter: string
}

export type FetchBody = {
    postId: string,
    filter: FilterOptionValue 
}


export const filterOptions: Option[] = [{
    value: FilterOptionEnum.Native,
    text: "Natywnie"
}, 
{
    value: FilterOptionEnum.Newest,
    text: "Od najnowszego"
},
{
    value: FilterOptionEnum.Oldest,
    text: "Od Najstarszego"
},
{
    value: FilterOptionEnum.MostLiked,
    text: "Najbardziej lubiany"
},
{
    value: FilterOptionEnum.LeastLiked,
    text: "Najmniej lubiany"
}]