import conexion from './conexion.js';

let form_login = document.querySelector('#form-login');
const mensaje_contra = document.getElementById('mensaje');
localStorage.clear;

function ui_register() {
    form_login.innerHTML = `<h1>Registrarse</h1>
    <input class="drop-shadow" name="Nid" type="number" id="" placeholder="Ingrese cedula" required>
    <input class="drop-shadow" name="nombre" type="text" id="" placeholder="Ingrese nombres" required>
    <input class="drop-shadow" name="apellido" type="text" id="" placeholder="Ingrese sus apellidos" required>
    <input class="drop-shadow" name="telefono" type="number" id="" placeholder="Ingrese su telefono" required>
    <input class="drop-shadow" name="fecha_nacimiento" type="date" id="" placeholder="" required>
    <input class="drop-shadow" name="pais_origen" type="text" id="" placeholder="Digite el pais de origen" required>
    <input class="drop-shadow" name="email" type="email" id="" placeholder="Emaill" required>
    <input class="drop-shadow" name="password" type="password" id="" placeholder="Contraseña" required>
    <input class="bt-login" type="submit" value="Registrar">
    <div>
    <span>Ya tienes cuenta? </span><span id="iniciar_sesion" class="Registrarse">Iniciar session</span>
    </div>`

}

function ui_session() {
    form_login.innerHTML = `<h1>Iniciar Sesion</h1>
    <input class="drop-shadow-xl" type="email" name="email" id="" placeholder="Digite tu email" required>
    <input class="drop-shadow-xl" type="password" name="password" placeholder="Digite tu contraseña "
        required>
    <input class="bt-login" type="submit" value="Ingresar">
    <div>
        <span>No tienes cuenta? </span><span id="Registrarse" class="Registrarse">Registrarse</span>
    </div>`
}


form_login.addEventListener('click', (e) => {
    if (e.target.id == 'Registrarse') {
        ui_register();
    }
    if (e.target.id == 'iniciar_sesion') {
        ui_session();
    }
})



form_login.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = new FormData(form_login);
    if (!form.get('nombre')) {
        conexion.get('cliente')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach(element => {
                    console.log(element);
                    if (element['email'] == form.get('email') && element['password'] == form.get('password')) {
                        localStorage.setItem('email', `${form.get('email')} `);
                        console.log('whiy');
                        window.location = '/view/compra.html';
                    } else {
                        mensaje_contra.style.display = 'block';
                    }
                });
            })
    } else {
        console.log(typeof (form_login))
        let obj = Object.fromEntries(form.entries());
        conexion.post(obj, 'cliente');
    }

})