# 3. MongoDB

## Índice

[1. MongoDB, instalación y sintaxis básica](#1-mongodb-instalacion-y-sintaxis-basica)  
[2. CRUD con el cliente de Node para MongoDB](#2-crud-con-el-cliente-de-node-para-mongodb)  
[3. Mongoose](#3-mongoose)

## 1. MongoDB, instalación y sintaxis básica

[...]

## 2. CRUD con el cliente de Node para MongoDB

### (C)reate

```
async function createPlanet(client, newMonster){
    const result = await client
                            .db("halloweendb")
                            .collection("monsters")
                            .insertOne(newMonster);

    console.log(`Nuevo monstruo: ${result.insertedId}`);
}
```

### (R)ead

```
async function findOneMonsterByName(client, monsterName) {
    const result = await client
                            .db("halloweendb")
                            .collection("monsters")
                            .findOne({ name: monsterName });
    
    if (result) {
        console.log(`Monstruo encontrado con el nombre '${monsterName}'`);
        console.log(result);
    }
    else {
        console.log(`No hay monstruos con ese nombre`);
    }
}
```

### (U)pdate

```
async function updateMonsterByName(client, monsterName, updatedMonster) {
    const result = await client
                            .db("halloweendb")
                            .collection("monsters")
                            .updateOne({ name: monsterName },
                                       { $set: updatedMonster });
    
    console.log(`Encontrados ${result.matchedCount} monstruo(s) con ese nombre`);
    console.log(`${result.modifiedCount} monstruo(s) modificado(s)`);
}
```

### (D)elete

```
async function deleteMonsterByName(client, monsterName) {
    const result = await client
                            .db("halloweendb")
                            .collection("monsters")
                            .deleteOne({ name: monsterName });
    
    console.log(`${result.deletedCount} monstruo(s) borrado(s)`);
}
```

## 3. Mongoose

[...]

## Referencias

[Instalación (Windows)](https://docs.mongodb.com/guides/server/install/)  
[Guías MongoDB](https://docs.mongodb.com/guides/)  
    [Estructura](https://docs.mongodb.com/guides/server/introduction/)  
    [Inserción](https://docs.mongodb.com/guides/server/insert/)  
    [Consultas I](https://docs.mongodb.com/guides/server/read_queries/)  
    [Consultas II](https://docs.mongodb.com/guides/server/read_operators/)  
    [Actualizaciones](https://docs.mongodb.com/guides/server/update/)  
    [Borrados](https://docs.mongodb.com/guides/server/delete/)  
[Cliente Mongo para Node](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)  
[Mongo CRUD con asincronía](https://mongodb.github.io/node-mongodb-native/3.0/reference/ecmascriptnext/crud/)  
[Mongoose](https://mongoosejs.com/)  
    [Node + Mongo + Mongoose I](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)  
    [Node + Mongo + Mongoose II](https://code.tutsplus.com/es/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527)
