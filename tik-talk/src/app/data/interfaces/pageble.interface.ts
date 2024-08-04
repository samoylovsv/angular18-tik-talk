export interface Pageble<T> {
  items: T[
    // {
    //   id: 0,
    //   username: string,
    //   avatarUrl: string,
    //   subscribersAmount: 0,
    //   firstName: ,
    //   lastName: ,
    //   isActive: true,
    //   stack: [],
    //   city: ,
    //   description:
    // }
  ],
  total: number,
  page: number,
  size: number,
  pages: number
}
