export interface Tea {
  _id: string,
  teaName: string,
  shortName: string,
  thumbnail: string,
  description: string,
  cafine: string,
  flavors: [string],
  tags: [string],
  ingredients: string,
  brewInstruction: {
    temp: string,
    water: string,
    time: string,
    direction: string
  },
  reviews: [{
    start: number,
    comment: string,
    user: {
      _id: string,
      username: string
    }
  }]
  category: string
}