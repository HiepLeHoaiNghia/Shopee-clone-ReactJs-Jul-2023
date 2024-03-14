const { VITE_API_URL } = import.meta.env

const config = {
  baseUrl: VITE_API_URL,
  maxSizeUploadAvatar: 1048576 // bytes
}
export default config
