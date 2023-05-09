import conexion from "./conexion.js";

let form_vuelo = document.getElementById("form-vuelo");
let select_origen = form_vuelo.children[0];
let select_destino = form_vuelo.children[1];
let container_temporal = document.getElementById('c-temp')

function main() {
    if (localStorage.getItem('email') != null) {
        container_temporal.innerHTML = " ";
    }


    conexion.get('rutas_areas')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let lista_o = [];
            let lista_d = [];
            data.forEach((i) => {
                if (!lista_o.includes(i["ciudad_origen"])) {
                    lista_o.push(i["ciudad_origen"]);
                }
            })
            data.forEach((i) => {
                if (!lista_d.includes(i["ciudad_destino"])) {
                    lista_d.push(i["ciudad_destino"]);
                }
            })
            lista_o.forEach((i) => {
                let option = document.createElement('option');
                option.textContent = i;
                option.value = i;
                select_origen.appendChild(option);
            })
            lista_d.forEach((i) => {
                let option = document.createElement('option');
                option.textContent = i;
                option.value = i;
                select_destino.appendChild(option);
            })
        })

}

function valor() {
    conexion.get('rutas_areas')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let index_o = select_origen.selectedIndex;
            let index_d = select_destino.selectedIndex;
            let select_o = select_origen.options[index_o];
            let select_d = select_destino.options[index_d];
            let precio = 0;
            data.forEach((i) => {
                if (i['ciudad_origen'] == select_o.textContent && i['ciudad_destino'] == select_d.textContent) {
                    precio = i['total_millas'] * i['valor_millas'];
                } else {
                }
            })
            if (precio == 0) {
                form_vuelo.children[2].textContent = `Valor:  $${precio}`;
                form_vuelo.children[3].textContent = `Valor total:  $${precio}`;
            } else {
                let precio_des = precio - (precio * 0.05)
                form_vuelo.children[2].textContent = `Valor:  $${precio_des}`;
                form_vuelo.children[3].textContent = `Valor total:  $${(precio_des - (precio_des * 0.16))}`;
            }

        })

}

addEventListener('change', valor);




main();
