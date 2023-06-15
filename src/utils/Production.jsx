const isProd = true

const isProdFunc = () => {
    if (isProd) {
        return "/spotify-clone"
    }
    return ""
}


export default isProdFunc
