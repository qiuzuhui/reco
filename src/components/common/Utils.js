export default {
  readAsDataURLs (files) {
    return Promise.all([].map.call(files, (file) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            resolve({
              name: file.name,
              dataUrl: this.result
            })
          }, false)
          reader.readAsDataURL(file)
        })
      }
    }))
  }
}
