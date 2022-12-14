export default ({ app }, inject) => {
  inject('discountPrice', function (value, discount) {
    return value * (1 - discount)
  })
}
