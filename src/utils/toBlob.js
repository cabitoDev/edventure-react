export async function uploadImage (src) {
  const img = new Image()

  const imgLoaded = new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = error => reject(error)
  })

  img.src = src

  try {
    await imgLoaded

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0)

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(blob)
      })
    })
  } catch (error) {
    console.error('Error al cargar la imagen:', error)
    return null
  }
}
