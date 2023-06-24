export const STATIC_HOST = 'https://api.ezfrontend.com'
export const THUMBNAIL_PLACEHODER = 'https://placehold.co/400x400'

export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}