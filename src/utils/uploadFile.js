//File deal tool

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function checkFile(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    return {message: 'You can only upload JPG file!'}
  }

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    return {message: 'Image must smaller than 2MB!'}
  }

  return isJPG && isLt2M
}


//re-organize cover object
export const parseUpload = (upload) => {
  let file = upload ? upload.file : null, cover

  if(file && file.status === "done") {
    let response = file.response
    cover = {
      filename: response.data ? response.data.realName : "",
      filepath: response.data ? response.data.filePath : "",
      lastModified: file.lastModified,
      size: file.size,
      type: file.type,
      uid: file.uid
    }
  }
  return cover
}

export const parseBatchUpload = (fileList, albumKey) => {
  let photos = [], photoFile, photo

  if(fileList && fileList.length > 0) {
    fileList.forEach((file) => {
      photoFile = {
        title: '标题',
        place: '',
        date: '',
        description: '',
        privacy: 2,
        album: albumKey
      }
      photo = {
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        uid: file.uid
      }
      if (file.response) {
        photo.filename = file.response.data.realName
        photo.filepath = file.response.data.filePath
        if(photo.filepath.indexOf("//") == 0)
          photo.filepath = photo.filepath.substr(1)
      }
      photoFile.photo = photo
      photos.push(photoFile)
    })
  }
  return photos
}
