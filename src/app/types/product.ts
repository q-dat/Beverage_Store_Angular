export class Products {
  id: number;
  id_catalog: number;
  name: string;
  img: string;
  img_child: string;
  price: number;
  sale: number;
  status: number;
  views: number;
  description: string;

  constructor(
    id: number,
    id_catalog: number,
    name: string,
    img: string,
    img_child: string,
    price: number,
    sale: number,
    status: number,
    views: number,
    description: string
  ) {
    (this.id = id),
      (this.id_catalog = id_catalog),
      (this.name = name),
      (this.img = img),
      (this.img_child = img_child),
      (this.price = price),
      (this.sale = sale),
      (this.status = status),
      (this.views = views),
      (this.description = description);
  }
}
export class Catalogs {
  id: number;
  name: string;
  img: null | string;
  description: null | string;

  constructor(
    id: number,
    name: string,
    img: null | string,
    description: null | string
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
  }
}
