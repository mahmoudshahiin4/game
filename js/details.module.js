import { Ui } from "./ui.module.js";

export class Details {
   constructor(id) {
      this.ui = new Ui();

      document.getElementById('closeDetails').addEventListener("click", () => {
         document.querySelector(".games").classList.remove("d-none");
         document.querySelector(".details").classList.add("d-none");
      });

      this.getDetails(id);
   }

   getDetails(idGames) {
      const spinner = document.querySelector(".spinner");
      spinner.classList.remove("d-none");

      const options = {
         method: "GET",
         headers: {
            'x-rapidapi-key': 'a8c64df8famsh01cb2146e07f7d6p14ff28jsn5d1bb6d85f84',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
         },
      };

      fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`, options)
         .then((response) => response.json())
         .then((response) => this.ui.displayDetails(response))
         .catch((error) => console.error(error))
         .finally(() => {
            spinner.classList.add("d-none");
         });
   }
}
