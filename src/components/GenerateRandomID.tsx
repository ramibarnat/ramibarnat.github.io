function generateRandomID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i=0; i < 10; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
}

export default generateRandomID;