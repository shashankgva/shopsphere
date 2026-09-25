import type { Product } from '../../types/product';

interface ProductSpecificationsProps {
  product: Product;
}

function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specifications = [
    ['SKU', product.sku],
    [
      'Dimensions',
      `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`,
    ],
    ['Weight', `${product.weight}`],
    ['Minimum order quantity', `${product.minimumOrderQuantity}`],
    ['Availability', product.availabilityStatus],
  ];
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Product details</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {specifications.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-2 border-b border-slate-200 p-4 last:border-b-0"
          >
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ProductSpecifications;
