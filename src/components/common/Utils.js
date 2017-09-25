export default {
  readAsDataURL (file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.addEventListener('load', function () {
          resolve(this.result)
        }, false)
        reader.readAsDataURL(file)
      })
    }
  }
}
