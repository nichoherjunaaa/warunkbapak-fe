export const generateSelectAmount = (amount) => {
    return Array.from({ length: amount }, (_, index) => {
        const amount = index + 1
        return (
            <option key={amount} value={amount} className="text-xs lg:text-sm">
                {amount}
            </option>
        )
    })
}

export const formatHarga = (harga) => {
    const rupiahFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(harga)
    return rupiahFormat
}