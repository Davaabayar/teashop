import {Tea} from "../../teas/tea.model";

export interface Shop {
  _id: string,
  name: string,
  image: string,
  logo: string,
  tags: [string],
  rate: number,
  contacts : {
    address: string,
    phone : string,
  },
  location: [
    string,
    string,
  ],
  thumbnail: string
}
