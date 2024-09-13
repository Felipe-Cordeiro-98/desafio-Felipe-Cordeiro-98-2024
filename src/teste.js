function verificaSeEstaoPresentes(array1, array2) {
    return array1.every((elemento) => array2.includes(elemento));
}

const arrayA = [1, 2, 3];
const arrayB = [2, 3, 4];

const estaoPresentes = verificaSeEstaoPresentes(arrayA, arrayB);
console.log("Os elementos estão presentes:", estaoPresentes);
