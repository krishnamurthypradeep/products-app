export const getProducts = async (q= "")=>{
        
    const url = q ? `http://localhost:4001/api/products?q=${encodeURIComponent(q)}`
                           :`http://localhost:4001/api/products`;
     const res=  await fetch(url,{cache:"no-store"})
     console.log('Server Hit')
     if(!res.ok) throw new Error('Failed To fetch products')
        return res.json()
                           

}

export const getProduct = async (id) => {
        
    const url = `http://localhost:4001/api/products/${id}`;
     const res=  await fetch(url,{cache:"no-store"})
     console.log('Server Hit')
     if(!res.ok) throw new Error('Failed To fetch products')
        return res.json()
                           

}