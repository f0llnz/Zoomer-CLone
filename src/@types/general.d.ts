type ChosenListItems = {
  id: string;
  title: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
  rating: number;
  amount: number;
};

type Token = {
  userId: string,
  isAdmin: boolean,
  exp: number
}

type ListItems = {
    images: string[];
    title: string;
    price: number;
    id:number;
    cartQuantity:number;
    currentImageIndex:number;
};

type CartItem = {
  images: string[];
  title: string;
  price: number;
  id:number;
  cartQuantity:number;
};

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
};

type Products = [{}]

export type ProductProps = {
  id: string;
};

export type ProductState = {
  cartItem:BanckEndItem[]
};

export type itemProps = {
  amount:string;
  images:string[],
  price:string;
  id:string;
  title:string;
  item:string
}

export type BanckEndItem = {
[x: string]: any;
amount: string;
brand: string
categories:string;
description:string[]; 
id: string;
images:string;
price: string  | Number;
rating: string;
title:strin;
}