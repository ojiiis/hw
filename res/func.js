import React from "react";
import * as fs from 'expo-file-system'
export async function getUser(key = ""){
    const getuser = await fs.readAsStringAsync(`${fs.documentDirectory}user`);
   // console.log(getuser)
     const user = JSON.parse(getuser);
     //console.log(user)
    return (key == "")?user:user[key]
}
