import { VariantSelector } from "./variant-selector";
import Price from "../price";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";

const options = [
  {
    name: "Color",
    values: ["Black", "White", "Red"],
  },
  {
    name: "Size",
    values: ["XL", "S", "M", "L"],
  },
];

const variants = [
  {
    id: 1,
    availableForSale: true,
    selectedOptions: [
      { name: "Color", value: "Black" },
      { name: "Size", value: "M" },
    ],
  },
  {
    id: 2,
    availableForSale: true,
    selectedOptions: [
      { name: "Color", value: "Red" },
      { name: "Size", value: "L" },
    ],
  },
  {
    id: 3,
    availableForSale: true,
    selectedOptions: [
      { name: "Color", value: "Red" },
      { name: "Size", value: "L" },
    ],
  },
];
export function ProductDescription({ product, productId }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-orange-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode={"USD"} />
        </div>
      </div>
      {/* <VariantSelector options={options} variants={variants} /> */}

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
      <AddToCart
        // variants={variants}
        // availableForSale={variants[productId].availableForSale}
        productId={productId}
      />
    </>
  );
}
