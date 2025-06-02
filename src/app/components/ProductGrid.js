import React from 'react'
import UniversalCard from '/src/app/components/UniversalCard'
import Link from 'next/link'

function ProductGrid({products}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-5">
            {products.map((p) => (
                 <Link href={`/ProductDetail/${p.id}`} key={p.id}>
          <UniversalCard product={p} />
        </Link>
            ))}
        </div>
    )
}
export default ProductGrid