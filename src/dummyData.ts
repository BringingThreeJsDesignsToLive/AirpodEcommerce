interface productDataType {
    brand: string,
    name: string,
    price: number,
    id: number,

}


const productsData: productDataType[] = [
    {
        brand: 'AKG',
        name: 'N-ENHANCED XR',
        price: 50.0,
        id: 1
    },
    {
        brand: 'Logi',
        name: 'EvoBuds M5',
        price: 70.0,
        id: 2
    },
    {
        brand: 'Sennheiser',
        name: 'Wireless N7007',
        price: 190.0,
        id: 3
    },
    {
        brand: 'Sennheiser',
        name: 'Wireless N7007',
        price: 190.0,
        id: 4
    },
    {
        brand: 'Sennheiser',
        name: 'Wireless N7007',
        price: 190.0,
        id: 5
    },
]

export default productsData;