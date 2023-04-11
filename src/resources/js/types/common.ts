export type errorsType = string[];

export type objectType = {
  [key: string]: any;
};

export type headerItem = {
  label: string,
  code: string,
}

export type restaurantType = {
  id: number | null,
  title: string,
  image: string,
  description: string,
}

export type dishType = {
  id: number | null,
  section_id?: string,
  title: string,
  description: string,
  image: string,
  price: number,
  availability?: boolean,
  timestamps?: string,
}

export type cartItemType = {
  id: number | null,
  section_id?: string,
  title: string,
  description: string,
  image: string,
  price: number,
  availability?: boolean,
  timestamps?: string,
  quantity: number,
}

export type orderType = {
  id: number | null,
  status: string,
  dishes: orderItemType[],
  value: number | null,
}

export type orderItemType = {
  id: number | null,
  title: string,
  image: string,
  price: number,
  quantity: number,
}