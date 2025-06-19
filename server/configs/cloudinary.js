import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINART_CLOUD_NAME,
        api_key: process.env.CLOUDINART_API_KEY,
        api_secret: process.env.CLOUDINART_API_SECRET
    })
}

export default connectCloudinary