const http = require("http")
const fs = require("fs")
const port = 9000


let products = JSON.parse(
    fs.readFileSync("./database/products.json", "utf-8", (err) => {
        if(err){
            console.log(err)
        }
    }))

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json")
    let { url, method } = req

    console.log(url);
    console.log(method);
    console.log(products);

    if(method === "GET"){
        if(url === "/products"){
            res.end(JSON.stringify(products))
        }
    }

    if(method === "POST"){
        if(url === "/products"){
            req.on("data", (chunk) => {
               let data = JSON.parse(chunk)

               products.push({id: products.at(-1)?.id + 1 || 1, ...data})

               fs.writeFileSync("./database/products.json", JSON.stringify(products, null, 4))

               res.end(JSON.stringify(products))
            })
        }
    }

    if(method === "PATCH"){

        let id = url.split("/").at(-1)
        url = url.split("/")[1]

        if(url === "products"){
            req.on("data", (chunk) => {
               let data = JSON.parse(chunk)

               products = products.map(el => {
                if(el.id == id){
                    return {
                        id: el.id,
                        name: data.name ? data.name: el.name,
                        price: data.price ? data.price: el.price
                    }
                } else {
                   return el
                }
               })

               fs.writeFileSync("./database/products.json", JSON.stringify(products, null, 4))

               res.end(JSON.stringify(products))
            })
        }
    }


    if(method === "DELETE"){
        let id = url.split("/").at(-1)
        url = url.split("/")[1]
        if(url === "products"){

            products =  products.filter(el => el.id != id)

            fs.writeFileSync("./database/products.json", JSON.stringify(products, null, 4))

            res.end(JSON.stringify(products))
        }
    }


})

server.listen(port, () => console.log(port))