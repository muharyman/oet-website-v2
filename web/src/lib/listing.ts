export interface PageSize {
  desktop: number | null
  mobile: number | null
}

export const firstPageClass = (index: number, size: PageSize) => [
  size.mobile !== null && index >= size.mobile && 'max-lg:hidden',
  size.desktop !== null && index >= size.desktop && 'lg:hidden',
]

export const facet = (values: string[]) => values.join(' ')

export const sortByTitle = <Item extends { title: string }>(items: Item[], locale: string) =>
  [...items].sort((a, b) => a.title.localeCompare(b.title, locale))
