export type AppTocModel = {
    label: string
    href: string,
    id: string | null | undefined
    subitems: Array<AppTocModel> | null | undefined
}