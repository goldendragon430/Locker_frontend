export const reducedAddress = address =>
    address.slice(0, 6) + '...' + address.slice(-4)
