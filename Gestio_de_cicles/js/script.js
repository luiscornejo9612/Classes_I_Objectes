// import { Cicle } from './cicle.js';
// import { Modul } from './Modul.js';
class Cicle {
    constructor(nom, categoria, numAlumnes, abreviatura) {
        
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.ultimaEdicio = null;
        this.moduls = [];
    }

    setNumEdicions() {
        this.numEdicions++;
        this.ultimaEdicio = new Date().toLocaleString();
    }

    afegirModul(modul) {
        this.moduls.push(modul);
        this.moduls.sort((a, b) => a.num - b.num); // Ordenar per número del mòdul
    }


    toString() {
        let modulsString = this.moduls.map((modul) => modul.toString()).join(', ');
        return `Nom del cicle: ${this.abreviatura.toUpperCase()}. ${this.nom}\nCategoria: ${this.categoria}\nNum d'alumnes: ${this.numAlumnes}\nNum d'edicions: ${this.numEdicions}\nÚltima edició: ${this.ultimaEdicio}\nMòduls: ${modulsString}`;
    }
}

let llistatCicles = [];

function afegirCicle() {
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;


    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
    console.log(cicle);

    if (document.getElementById("editCicle").value === "-1") {
        // Afegim el cicle al llistat
        llistatCicles.push(cicle);
    } else {
        // Editar cicle
        let index = document.getElementById("editCicle").value;
        llistatCicles[index] = cicle;
    }

    cicle.setNumEdicions(); // Incrementa el número d'edicions i guarda la data de l'última edició

    // Actualitzem el selector
    actualitzarSelector();

    // Printem la llista
    printLlistat(llistatCicles);

    // Netejem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value = -1;
}

function calcularHores(index) {
    let cicle = llistatCicles[index]
    let calcul = 0;
    cicle.moduls.forEach(function(modul){
        calcul+= parseInt(modul.hores,10);
    });
    alert (`El total de horas del ciclo es: ${calcul}`);
}

function afegirModul() {
    let cicleIndex = document.getElementById("modul_cicle").value;
    let modulNom = document.getElementById("modul_nom").value;
    let modulNum = document.getElementById("modul_num").value;
    let modulHores = document.getElementById("modul_hores").value;

    let modul = new Modul(modulNum, modulNom, modulHores);
    console.log(modul);

    llistatCicles[cicleIndex].afegirModul(modul);

    // Printem la llista
    printLlistat(llistatCicles);

    // Netejem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                <h6 class="text-gray-700">${element.categoria}</h6>
                <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>
                <p class="font-normal text-gray-700">Num d'edicions: ${element.numEdicions}</p>
                <p class="font-normal text-gray-700">Última edició: ${element.ultimaEdicio}</p>
                <p class="font-normal text-gray-700">Mòduls: ${element.moduls.map(modul => modul.toString()).join(', ')}</p>

                <button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                <button type="button" id="${index}_hores" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
            </div>`;
    });
    document.getElementById("llistat").innerHTML = str;
    llistat.forEach(function (element,index){
        document.getElementById(`${index}_hores`).addEventListener("click", function(){
            calcularHores(index);
        });
    });
}
{/* <button type="button" onClick="calcularHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button> */}



//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector() {
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function (element, index) {
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(index) {
    llistatCicles.splice(index, 1);
    printLlistat(llistatCicles);
}

//Funció per editar un cicle
function editCicle(i) {
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value = i;
}

//Funció per netejar els formularis
function netejarFormularis() {
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}


class Modul {
    constructor(num, nom, hores) {
        this.num = num;
        this.nom = nom;
        this.hores = hores;
    }

    toString() {
        return `MP${this.num}. ${this.nom} (${this.hores}h)`;
    }
}

