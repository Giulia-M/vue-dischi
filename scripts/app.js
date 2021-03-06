/*
    - dobbiamo recuperare la lista degli album dal server
        - url da chiamare: https://flynn.boolean.careers/exercises/api/array/music
    - Una volta effettuata la chiamata, il server mi ritorna un JSON di questo tipo:
        "success": true,
        "response": [{
            "poster": "https://www.onstageweb.com/wp-content/uploads/2018/09/bon-jovi-new-jersey.jpg",
            "title": "New Jersey",
            "author": "Bon Jovi",
            "genre": "Rock",
            "year": "1988"
        }]
    - Da questi dati dovrl recuperare il valore della chiave "response"
    - I dati recuperati li devo salvare in una variabile.
        - Questa variabile, siccome la dovrò usare nell'html, dovrà essere creata
            all'interno di "data"
            - Quale sarà il valore iniziale di questa variabile? 
                - Se lo setto come array vuoto = [] allora nell'html potrò usare .length
                - Se lo setto come null, allora nell'html potrò usare !nomeVariabile
*/

new Vue({
    el: "#app",
    data: {
        input: "all",
        albumsList: []
    },
    computed: {
        genereFiltered() {
            if(this.input === "all") {
                return this.albumsList
            } else {
                return this.albumsList.filter((element) => {
                     return element.genre.toLowerCase() === this.input.toLowerCase() 
                 })
            }
        },
        
        getGeneresList() {
            const finalList = []

            this.albumsList.forEach((element) => {
                if (!finalList.includes(element.genre)) {
                    finalList.push(element.genre)
                }
            })
            return finalList
        },
    },
    
    
    mounted() {
        /*
        Tramite axios recuperiamo i dati del server.
        */
        axios.get("https://flynn.boolean.careers/exercises/api/array/music")
            .then((resp) => {
                /*
                  Array di oggetti con le seguenti chiavi
                    "poster"
                    "title"
                    "author"
                    "genre"
                    "year"
                */
                this.albumsList = resp.data.response;

                /*
                    una  volta ricevuti i dati dal server, 
                    prima ancora di salvarli nella variabile di vue, 
                    posso eseguire il sort in modo da salvare poi i dati già ordinati
                */
                this.albumsList.sort(function (indice1, indice2) {
                    return indice1.year - indice2.year;
                })


            });


    },
   
})