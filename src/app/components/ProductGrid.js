import React from 'react'
import UniversalCard from '/src/app/components/UniversalCard'

function ProductGrid({products}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-5">
            {products.map((p) => (
                // Using UniversalCard component to display each product
                //key is used to uniquely identify each element in the list
                <UniversalCard key={p.id} product={p} />
            ))}
        </div>
    )
}

export default ProductGrid