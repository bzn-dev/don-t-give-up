class JsonHandler {
    constructor(lerUrl, escreverUrl) {
        this.lerUrl = lerUrl;
        this.escreverUrl = escreverUrl;
    }

    async lerArquivoJson(callback) {
        try {
            const response = await fetch(this.lerUrl);
            const json = await response.json();
            if (typeof callback === 'function') {
                callback(null, json);
            }
        } catch (error) {
            if (typeof callback === 'function') {
                callback(error, null);
            }
        }
    }

    async escreverArquivoJson(data, callback) {
        try {
            const response = await fetch(this.escreverUrl, {
                method: 'PUT', // Alterado para PUT para atualizar o arquivo
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (typeof callback === 'function') {
                callback(null, json);
            }
        } catch (error) {
            if (typeof callback === 'function') {
                callback(error, null);
            }
        }
    }
}

export default JsonHandler;
