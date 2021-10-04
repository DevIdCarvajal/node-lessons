# Ejercicios de Express

## 5. Mi primera API REST

Se pide crear los siguientes endpoints y testearlos con Postman:

- GET /characters: Devuelve todos los personajes (array de objetos JSON)
- GET /character?name=Fry: Devuelve los datos del personaje recibido por parámetro
- GET /charactersByProfile?profile=Capitana: Devuelve los datos de los personajes con el perfil pasado por parámetro
- POST /newCharacter: Recibe datos de un nuevo personaje y los guarda
- PUT /updateCharacter?id=1: Recibe datos de un personaje preguardado, seleccionado por su id, y los actualiza
- DELETE /deleteCharacter?id=1: Elimina los datos de un personaje preguardado, seleccionado por su id

Nota: Los datos se guardarán en memoria del servidor, no en fichero ni base de datos.