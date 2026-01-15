import ProductHeaderCard from "./HeaderCard";

export default function ProductHeader() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <ProductHeaderCard title="Stok tersedia" variant="success" count={0} />
      <ProductHeaderCard title="Stok segera habis" variant="warning" count={0} />
      <ProductHeaderCard title="Stok habis" variant="danger" count={0} />
      <ProductHeaderCard title="Gudang" variant="primary" count={0} />
    </div>
  );
}
