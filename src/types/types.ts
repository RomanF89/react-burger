export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: "bun" | "main" | "sauce";
  readonly __v: number;
  readonly _id: string;
  count?: number;
};

export type TDateType = {
  weekday: 'long' | 'short',
  hour: "numeric" | "2-digit" ,
  minute: "numeric" | "2-digit",
  timeZone: string,
  timeZoneName: "long" | "short",
}

export type TProtectedRouteProps = {
  children: JSX.Element;
  path: string;
};

export type TFeedOrder = {
  readonly createdAt: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
  readonly owner: {
    email: string,
    name: string,
  };
};

export type TFeedData = {
  orders: TFeedOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type TOrderInfoFromApi = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  _v: number;
  _id: string;
}
