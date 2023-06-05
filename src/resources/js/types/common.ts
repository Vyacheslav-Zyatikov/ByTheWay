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
  email: string,
  is_admin: number,
  rate: string,
}

export type sectionType = {
  id: number,
  restaurant_id: number,
  title: string,
  dishes: Array<[]>,
}

export type dishType = {
  id: number | null,
  section_id?: number | string,
  title: string,
  description: string,
  image: string,
  price: number,
  availability?: boolean,
  restaurant?: restaurantType,
  timestamps?: string,
}

export type cartType = {
  id: number,
  session_id: number,
  dish_id: number,
  price: number,
  count: number,
  value: number,
  dish: dishType,
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
  session_id: number,
  restaurant_id: number,
  restaurant?: string,
  userPhone?: string,
  total: number | null,
  status: string,
  dishes: orderItemType[],
}

export type orderItemType = {
  id: number | null,
  order_id: number | string,
  dish_id: number | string,
  price: number,
  count: number,
  value: number,
  dish: dishType,
}