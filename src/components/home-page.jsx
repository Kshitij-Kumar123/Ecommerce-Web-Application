import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from './navbar';


const ItemShowcase = (props) => {
    // console.log(props); 
    const image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFhUVGBgYFhcWGBgXGBgVFRYXFhUXFRUYHSggGBolGxcVITEhJikrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGS0lHyUtLS0tLS0tLS0tLS0tMC01LS0tKy0tLS0tLS0tLSstLS0vLS0tLS0tLS0rLS0tNC0rK//AABEIAL0BCgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgIDBAUHAQj/xABIEAABAwEFBAYGBQgKAwEAAAABAAIDEQQFEiExBgdBUSJhcYGRoRMyQlKxwTNUkpPRFCNEYnKC0vAXQ1NVg6KjwtPhY7Lxc//EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAQEAAgEEAgIDAQAAAAAAAAABAhEDBBIhMUFRIjITFCNx/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAisttcZeYw9peBUtqMQHMt1V5AREQEREBERAREQEREBERAREQEREBERAREQEREBERARYF8XzBZWeknkDG8K1JJ5NaAS49gUJt+9uytyihlk63Ojjb5uLv8AKpmNvodFRcVvDevbH1EYs0A59OZw8Q1vkopee0k8/wBPb7TIOLWUhYe1oqPJX/jqNu93vtXYrLX01pjaR7IOJ32G1Khtt3uxOJbY7LNaCMq0IaO3CDl20XHxbLOz1bMxx5yl0nk408latV8TSDC55DBoxvRaP3RkrTCG0xvrereZeWDBB1NDXEdpJd8VrRvEvOjh+VOIdqcLAeGjsNR3FRiyXdNMfzcbndYFG97z0R4qQ2TZbT0soH6sfSJ/eNG+FVpjx3L1FMs5PdXrl2mcJmSEDGHipqRrkT25k18ufe9nb5ZaWGhq5hwvypmOX/XEFcMfszZwNZWVrRxcHcOLcI4itMtBSq6vsrYmRmOQ2kyPILaMGCM4qAkg1LjUZZqeXDWP5e/hTHLuy8JmiIuRuIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIsC/7d6CzTzf2cUj/ALLSR8EHzDtReklotc8r3l2KR+GprRgcQxo5ACgWua4q/Ybrml9SNxHvHJv2jkpJYNkBrLIf2Yx/vcOrg1deOGWXqMss8Z7Raq2FkuS0SULYyAfaf0G9tXa91VOrFdEMObI2NpniPScKa9J1SO6isyX1CNGvfQ0xUyzyrmakZ8eRWv8ADJ+1Zfy2/rGjsmx1T+dl/djHXT13/wAK3ti2dhZ6sLK85KvPg6oB14BWbVf/AEKxso5w6PpKNbnTPI55lo4a9yqbftS1rGgyOa0hhJbQuw+uaZCp4V0WknHPSludbeSwHD0nVPCmgp/PBVej6Lg2jXEGjqVoTWhI455q5CXYRjIxUzppXjSvBUsyyW0Y7c3va6bZHiMjvSAZl5fkesNJy7FgXPfU9llbLE9zHNIcKVLSRwcNCCpRtTdFrmmxNLTFQYBioG5DFjHOtcxXJaO1XPNZ/RPFJHkuOAMLxhZTMt1Iz5clw8uF3dS6dnHnNea+oLpt7LRBFOw1bKxr29jgCPistc13S7XyWgGy2inpGgvjIGHo4s2EcxUEcaVroulLks03ERFAIiICIiAiIgIiICIiAiIgIiICIiAiIgLQbbzAWR7T/WUZQgEEHNwIPDCCt+odvDkyhZzLneAAHxK14cd5yKcl1jUKDB4aKtq9DFTPOyMVc4AaDrJ0AGpPUF63p5/tqNpZ+h6NrgCfW4ig0a7gKkjX5rQujkFS1uYoTQUOYJOR4adLPXWuSyJY21JiDmtLnEYq9HLM5CvPSpXkV3l/AucACcOIV0DcVW5ZDIjTjnmuPO3KurGdsYrXGTCWgDMh+AVINWjo4gKk4mjjQngNJFs9YS1okcSSR0a00IBc6o5mtOonmrtkuYNoZSHU0bmaGvtOJqaZ5frOzIOWzr2ADuAA+S14+PXms889+I9LlQ5/HzOQ56/gtPeW1FmiybWV44MphBr7Tjlz0r3KI3rflon6BcGsPsM5Z0xO1crZcuOKuPFalN77Twx9Fh9K8cBk0Ecz/wDepaK7NqJopZLRU+kdG6NhBoGEuaeiOqhPaVp5IMDMRFB81j9YzPshcvJyXP26ceOYun7nbC59qNqkPRYHAOd7UjxQ0J1oC6vWQu3r5esu1Fva1kUdGBuTWMjqSeAoalxJ8TVde3ebcunIs1qI9LToSZAP44CPe5U1A568+Ut8tXQ0RFmkREQEREBERAREQEREBERAREQEREBERAUBttljtDnvq76SQBzXcGvLaUNRTLqyU1vG0ejie/3Wk8tBxPJfNrbzt93yEYnNDiTQ9KN9TmRwPdQrXCZa7sVMtW6rpclySjNpa8fZPgcj4rX2mAsP52MtI0L25Z6gO08CsC6d5jDQWiEg+/HmO9pzHiVMrrvyzWgfmZ2k+6TQ6cWGnmtZ1PJj+02zvBjfSMsjYdGtpSmQGnLsVzQHh2cSVK57qidUmJhPMCh48W4erisaTZ2E+zIOx5+BqtJ1ePzFL0+XxUBvy/mwClMbyKhmgAOheeHZqoVeV6zz/SP6Pujot8OPfVdek3f2J7y97Jnlxq6spFT3AfHktpYNlbHDnHZYgRo5wxu8X1PmFlydT3emuHFMf+uJXRs/arRT0ED3g+0BRn3jqN81L7Puzl9G58krDIGksiYCWk0yDpDThXQajjoupmP3j8vDlpwV5jeQ+XPn/OawvJWmnzheMUrSY52uBBqWmrSKfLyViztDdNetfRV43LFOKSsY4dYxU7DkQexRufdpY3Vo57CeVHAdmMFWnJPk7XIqmlWgGmdNNFcu+1yOJrUAtIdUZ0dyxaHjXKhopzfO62dgxWeRstPZPRfSnAk4SfBRSwQtjkLZqsc0kFrgQajgRzzV5lL6RpONi94NoY9sdok9LH6pL8LXNoNcbqcvaPgunXPtRY7VlBaGPOfRza401oxwBPgvnh1kMlqOEgQkh1ToSBm3CM83CvKhV6U+glo0gFpD2lpOR1FDrw6u5RcJTen0yi5/at6VmYxpjiklJa0uzaxrSRmC55qT3LOuHeRY7SWtOOF5IFJAKYjwxtJHeaLPtq20yReAr1VBERAREQEREBERAREQEREBERBots5KWV494tb3FwJ8gubvs4c0tNHNOrXAOb4Hj1roG3j6Wdo5yDya4qDMXo9JP83Hz38kZvDZKI5sLoj9tnPjm3xUettxzxZ4cQHtR5+Wo8F00Kh0A10PMLXLhxqmPNlEBunbK22egbMXtHsydMeJzHiprdG9GJ1BaInMPvM6TfDUeaxbxuOKX14w4+83ov8AHj3qNXjsm5tTC/H+o7ov/dOjvJcufTOjHmldfsN/QzgGGRjxXOjsx2t15a0WfhJ1PhkPx8185Br4ntJDmOGYriacuRyPgpFYdtLbZ3UEvpGZUEnSq05jMGoNDpU0XNeP6bbdtY0DRVVXOrs3oRmgnhcw82HE3vBoR5qUXftbY5vUtDKng44D4OoVS42Jb4FRfeVaHx2IvY5zXCSMgtJBBxcwpALZHSuNtP2gudbzdpYpWts0Tw+jsUhaagYQaNroTU17lOM8lSLYHbcWmkE9Gz06J9mQDi3k7q7SOrcbYbIxW5hcA1k4HRfTXk1/McjqOHEHg0czmkOa4hzSC0jIgg1BBXftjb6/K7LHMaY/VeBwe3J3cde9Wzx7fMRK4xaY5LNIYZ2Fj2+B6weLeRWpviPE4PaaGlDxqOHxX0Lf1wWe2MwzMqRXC4ZObXkeXVoufXjuqkqTDO13IPBae9wqP8qtOSX2WOeROIFKnQceQI4nkse0WsRuw0Olfl8lt9obmmsTmsmZQuBoQQWuAyNCD18QNQtcyRrqYgOqo+FVpvfpVutn78tNhcHRSlrXUd6M1wVPrBzDkQeY6811vZXePZ7W4xygWeQHo4n1Y8UByeQKHqPcSuC3vI84MNSM9OCuRRPEeMmnOueSrZL7S+rGuBFQQQdCF6uC7rNqW2e1COSbDBI1woScAdkWuI0boRi6813gPFK1y/HRZZY6qZdqkXlV6qpEREBERAREQEREBERBEtv5Mom8y4+AA+ZUTjapJt6fzkQ/VPmf+lHIl6nTT/OODnv51VhTCqwUW7JRReObVV1XiDMuqyxTtdDKxr26gOAPbTkf+1q763bxSfQvMZAyB6baVJpnmMzrU66ZLLsU+CVruFaHsOX89ql7uB/nP+fJeb1ONwz3Pl3cGXdjpw69ti7ZBUmIvaPaj6X+X1vJR1zaEgjPiPxC+lqLW3ns/ZrR9LEx3WRmOx2o8VjOT7a6fPKrqutW/djZnZxvkj6q42+Ds/NaOXdbMD0Z2EdbCPgSrzOI1UCBXXtzrXfk0pPqulOHua0EjwA7itXde63pAzzVb7rBhr2uJJ8AF0m7rGyFjY42hrWigA4BUzzlmomRnAqqqsYlg35erLLBJM/RgrTmdAB1k0CzWcs3uXiJLayIZ+iYAf2nnEfINUQdRWp7U+WR8rzVz3Fzu1xr4KkuXTjNTTOvaqp1pqMJFQciOYVIXskeFuJ3E0px7B+PAdtDYbK6rtbKcMLQ12Vak6DjXlwoPNfQ90wOZZrPGcRLWRtccq9BozdU9XCpzXP92GzNI22qUAukzYODWcKV50rU65KdX5fVnsjBPO6mGobTNzifZY3iTQLnyu7pZtHnpN6weB6uIyHf3IX4dSAK0FTrXQcKGuVFzaTfFDXo2WUjrcxp48BXkeKpO91v1N/3o/g/midmX0bdN9JTXKpoK0zPDjxXuMZVyrz58u1cuO97lYz3y9n/AI+vyKxZt783s2SNv7UjneWEJ2ZfRt10uCNNcwuE2/epbng4TDFUGhYzE4VpxeXDy4KN2fbS1wyGSOeTETVxLqhx62eqfBWnHTb6bRRjd9tULxsolIDZGHBK0aYwAQ5v6pBB8RwUnWdmkiIiAiIgiO28NXRu6iPP/tRcNXR7WTiyppxqrDogfWiYe0A/ELp4+q7Me3TDPg7rvaAYV7RTo2KI62dn2WK2bugOsAHYP4StP7uP0z/rX7QjCmFTF9z2bXA4d8nwViS4oP7Rzf3m/wC4K86vBF6fJEZW8f5/nj3KVXRaPSRCuo6Lu0c6Idm2nSU+APwor913G6Eu/OhzXAdHARQjjUuKx5+bDkx8Xy04ePLC+V5qqCvizOqdPMJ+TO/V8T+C4nSs1QFXvyV3V4r0WV/LzH4qRaCrDVV6B/un4/BeUcNQR2goPcK4vvN2m/KZvyeN35mI5kHJ8g1PYNPFS7edtQ6zR/k8ZIllGbvcYagkHmcwO9cbY4Ba8ePyravBqrwKqOQLwu48AtlVTaNGJ1aDlqeoda8JrmaAnhwA90fM8VaBLjU6cBy6+1VkKRMrj3iWmywNgEbJAwYWOdUENGgNMneWQUevi9ZbVIZZ3l7uA0a0ZGjW6NC17V7UKJjN7NqzIrbpCqXOVpz1YVOkVBesuz3PaZfo7PM+vuxvd5gLd2Ld3ecullc0c5HMZ4gmvkq3KGkVcVYc0nRdQsW6C0n6a0Qx9TA6U+HRHmpPdW7e77OQZMdoeM6Pyb90zUdTiVS8kW00u4OORhtRLXejf6Kj/YxsLwWg8TR405Z8F2JRa8rwjs8bS7DFG0gMY0AFzvZZGxvEngPJSgLG3d2l6iIgIiIMK0+t4K2FB9u9orwsNpLmwslsz8OAlriW9FocC5py6VTmNDqtFZt8IzEljIpxZLWuVfVcwU8U7bR1aqVXOIN79kcATBaBXkIz/vWY3erd51MzeVY9fsuKjtqU6qlVC/6Trt4zPH+FJ8mq4N5N2fWCO2KX+BR21CXFoOoHgvPRN90eAUVG8W7PrIHbHKP9qqG8O7PrQ72SDx6KaolBib7oT0Y6+4kfAqKjeLdn1kfdy/wL0bxbs+s/6cv8CdtSlfo+s+K9wn3j5fgou3eDdp/Sm/Yk/hV9u3F3H9Mi8T+CaokTcXveI/Ciqa944g+I+ZWjj2vu86W2z/esHxKzYb7szs22iEjqkYfmo0Nh6V/ENPf+IVt7Q71omHtofiFbZeER0lYexzT81X+Vx6Y2/aCCy6wQO9ayRHtZGViv2fsTsnXfZzx+ih1WwNrjGr2CunSH4qzNetnYaPniaToHSMB8yp3RhnZuw/3dZ/uoV6dnbD/d8H3USy5L2s7aYp4RXSsjBXsqVbfftkABNpgAOhMrM+PNTuoY52csH93wfcxoNnbANLvs/wBzH8wj9q7A00NtswP/AO0f4rGm24u1utshP7LsX/rVN5DOZc9jbm2wwA9UMQPwWbE0M9SJrewNHwUStW8+7WaSveeTI3/FwA81oLfvjiH0Nke7rle1nk0Or4hNZHh1AyyHkO8n5BWZnkNq+QNHE5NHi6q4bee9K8Jahjo4QdPRsq6nW5+KvaAFGbXa7RaTWaWSQ/8Akc5wHYDWncrdn3Tbtt77e3bBUGYzOHsxVk0/Wyjr3qH3nvSmk/N2SziPFkHO/OSEnTCxowh32lF7muizlwM5mcPdiAZ4vdXLsAXUNmLzsFmys9iLCci/13nte6ru6qntxgxNhtirTJO23Xi57ntzijkNXYtQ5w0YBqGCmetKUPUlg3deImFQx7f2hRZyigiIoBERB4RVYk11Wd/rQRO7WNPxCzEQaWbZKwO9axwH/DaPgFiybBXYdbFD3AjwoVJEU7EUfu4uo62Nn2pB4UdkrLt190n9E/1Z/wDkUxRNiF/0V3T9WP3058sa8O6q6fqzvvp/+RTVE3RCjuqun6s77+f/AJF5/RRdP1d/38//ACKbIm6IOd091cIHjsmm+blb/ojuvhHKP8Z5+JKniJujn7t0F28PTjsk/FpVh+5q7zmJLSD+2zTvjXR0TdHNHblbCf6+014GsWh1/q1bduTsR/SLRlp9Fr92unom6OXHclY/rNo/0uGnsKv+hWx8bTaf9IaZ/wBmunIndRzUbmLDxntJ4+tEMx2Rq6Nzl38ZbSf34/lGuiom6OfjdBd3EzmnOQDq4NCvN3S3XqY5T/jSD/1IU6RN0Q6LdfdQ/Rie2WY/F6vt3c3UP0Nn2nn4uUqRNiOx7C3a3SyR+Z+JWdBs5Y2erZoh+6FtEUDFbdsI0hjH7jfwV5kLW6NA7AAriICIiAiIg//Z"
    return (
    <div className="row justify-content-center">
        <div className="card col-sm-12 col-md-10 col-lg-8">
            <div className="row card-body">
                <img className="col-sm-8 col-md-6 col-lg-6" src={image} alt="Item"/>
                <div className="col-sm-4 col-md-6 col-lg-6">
                    <h5 className="card-title">{props.item.brand}</h5>
                    <p className="card-text">{props.item.description}</p>
                    <p className="card-text">${props.item.price} CAD</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default function HomePage() {
    const [ itemsForSale, setItemsForSale ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/items')
            .then(res => {
                // console.log(res.data);
                setItemsForSale(res.data); 
            })
            .catch(() => console.log("Error"))
    },[])

    return (
        <div>
            <Navbar />
            { itemsForSale.map(item => {
                // console.log("from map: ", item);
                return <ItemShowcase item={item} key={item._id} />
            }) }
        </div>
    )
}
