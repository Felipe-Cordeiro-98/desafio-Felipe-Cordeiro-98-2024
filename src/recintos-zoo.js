class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        try {
            const dadosDoAnimal = this.verificarDados(animal, quantidade);
            const recintos = this.verificarRecintoDisponivel(dadosDoAnimal);
            const espacoDoAnimal = dadosDoAnimal.tamanho * quantidade;
            const recintosViaveis = [];

            if (quantidade === 0) throw new Error("Quantidade inválida");

            for (let i = 0; i < recintos.length; i++) {
                let tamanhoUtilizado = 0;
                for (let j = 0; j < recintos[i].animaisExistentes.length; j++) {
                    tamanhoUtilizado += this.verificarDados(recintos[i].animaisExistentes[j]).tamanho;
                }
                let animaisDiferentes = recintos[i].animaisExistentes.filter((x) => x !== dadosDoAnimal.especie).length;

                let tamanhoTotal = tamanhoUtilizado + espacoDoAnimal;
                if (animaisDiferentes > 0) {
                    tamanhoTotal = tamanhoUtilizado + espacoDoAnimal + 1;
                }

                if (tamanhoTotal > recintos[i].tamanhoTotal) throw new Error("Não há recinto viável");

                const espacoLivre = recintos[i].tamanhoTotal - tamanhoTotal;
                recintosViaveis.push(`Recinto ${recintos[i].numero} (espaço livre: ${espacoLivre} total: ${recintos[i].tamanhoTotal})`);
            }
            
            return { recintosViaveis };
        } catch (error) {
            return { erro: error.message}
        }
    }

    verificarDados(animal, quantidade) {
        for (let i = 0; i < animais.length; i++) {
            if (animal.toLowerCase() === animais[i].especie.toLowerCase()) {
                return animais[i];
            }
        }
        throw new Error("Animal inválido");
    }

    verificarRecintoDisponivel(dadosDoAnimal) {
        let recintosPorBioma = [];
        let recintoCompativel = [];

        for (let i = 0; i < recintosExistentes.length; i++) {
            if (recintosExistentes[i].bioma.some((x) => dadosDoAnimal.bioma.includes(x))) {
                recintosPorBioma.push(recintosExistentes[i]);
            }            
        }

        if (dadosDoAnimal.especie === "macaco") {
            for (let i = 0; i < recintosPorBioma.length; i++) {
                if (!recintosPorBioma[i].animaisExistentes.some((x) => this.verificarSeEhCarnivoro(x))) {
                    recintoCompativel.push(recintosPorBioma[i]);
                }                
            }
        }
        
        if (this.verificarSeEhCarnivoro(dadosDoAnimal.especie)) {
            for (let i = 0; i < recintosPorBioma.length; i++) {
                if (recintosPorBioma[i].animaisExistentes.length === 0 || recintosPorBioma[i].animaisExistentes.some((x) => dadosDoAnimal.especie.includes(x))) {
                    recintoCompativel.push(recintosPorBioma[i]);

                }
            }
        }
        return recintoCompativel;
    }
    
    verificarSeEhCarnivoro (especie) {
        const animaisCarnivoros = ["leão", "leopardo", "crocodilo"];
        for (let i = 0; i < animaisCarnivoros.length; i++) {
            if (especie === animaisCarnivoros[i]) {
                return true;
            }
        }
        return false;
    }
}

let recintosExistentes = [
    {numero: 1, bioma: ["savana"], tamanhoTotal: 10, animaisExistentes: ["macaco", "macaco", "macaco"]},
    {numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animaisExistentes: []},
    {numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: ["gazela"]},
    {numero: 4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: []},
    {numero: 5, bioma: ["savana"], tamanhoTotal: 9, animaisExistentes: ["leão"]}
];

let animais = [
    {especie: "leão", tamanho: 3, bioma: ["savana"]},
    {especie: "leopardo", tamanho: 2, bioma: ["savana"]},
    {especie: "crocodilo", tamanho: 3, bioma: ["rio"]},
    {especie: "macaco", tamanho: 1, bioma: ["savana", "floresta"]},
    {especie: "gazela", tamanho: 2, bioma: ["savana"]},
    {especie: "hipopotamo", tamanho: 4, bioma: ["savana", "rio"]}
]

export { RecintosZoo as RecintosZoo };

/*

O programa deve retornar uma estrutura contendo a lista de todos os recintos viáveis ordenada pelo número do recinto (caso existam) e a mensagem de erro (caso exista)

A lista de recintos viáveis deve indicar o espaço livre que restaria após a inclusão do(s) animal(is) e o espaço total, no formato "Recinto nro (espaço livre: valorlivre total: valortotal)"

Caso não haja recinto possível, apresentar erro "Não há recinto viável"

*/