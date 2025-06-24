const ProductCard = ({ product }) => {
  return (
    <div className="relative border p-4 rounded-md shadow hover:shadow-lg transition">
      {product.sale && (
        <div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-1 text-xs font-bold rounded">
          SALE
        </div>
      )}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-52 object-contain mb-3"
      />
      <p className="text-xs tracking-widest text-gray-500 uppercase">{product.category}</p>
      <h3 className="font-semibold">{product.name}</h3>
      <div className="text-red-700 text-sm">{product.rating || '★★★★☆'}</div>
      <p className="mt-1">
        {product.oldPrice && (
          <span className="line-through text-gray-400 mr-2">${product.oldPrice}</span>
        )}
        <span className="text-lg font-medium text-gray-800">${product.price}</span>
      </p>
    </div>
  );
};

export default ProductCard;