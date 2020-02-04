import {Tea} from "../../teas/tea.model";

export interface Shop {
  _id: string,
  name: string,
  image: string,
  logo: string,
  tag: [string],
  contacts : [{
    address: string,
    phone : string,
  }],
  location: [{
    long: string,
    lat : string,
  }]
}
