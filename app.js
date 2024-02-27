
document.addEventListener('DOMContentLoaded', () => {

const userName = document.getElementById('userName');
const userPassword = document.getElementById('password')
const loginButtom = document.getElementById('loginButton');



if (loginButtom){
    loginButtom.addEventListener('click', () => {
    
    
    const LoginData = {
        nombre:userName.value,
        contraseña:userPassword.value
    }

    const requestOption = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginData),
    }
    fetch('https://walmart.somee.com/publish/v1/Administrador/iniciar/sesion', requestOption)
    .then(response =>{
        if(response.ok){
            return response.json();
        } else {
            console.log('no se inicio sesion')
            throw new Error('Response not OK');
        }
    })
    .then(data => {
        console.log('inicio de seion')
    })
    .catch(error => {
        console.error('error al iniciar sesion', error)
    })


})


const apiUrl = 'http://localhost:5297/v1/Establecimiento'

fetch(apiUrl)
    .then(response =>{
        if(!response.ok){
            console.log(response.status)
            throw new Error("No se conecto")
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error', error)
    })

}
else{
    console.error('Elemento con id "loginButton" no encontrado');
}});