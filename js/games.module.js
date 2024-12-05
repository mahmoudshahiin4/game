import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
   constructor() {
      this.getAllGames("mmorpg");

      document.querySelectorAll(".menu a").forEach((event) => {
         event.addEventListener("click", (e) => {
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            this.getAllGames(e.target.dataset.category);
         });
      });

      this.ui = new Ui();
   }

   async getAllGames(category) {
      const spinner = document.querySelector(".spinner");
      spinner.classList.remove("d-none");
      const options = {
         method: "GET",
         headers: {
           'x-rapidapi-key': 'a8c64df8famsh01cb2146e07f7d6p14ff28jsn5d1bb6d85f84',
		     'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
         },
      };

      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();

      this.ui.displayAll(response);
      this.clickCard();
      spinner.classList.add("d-none");
   }

   clickCard() {
      document.querySelectorAll(".card").forEach((item) => {
         item.addEventListener("click", () => {
            const id = item.dataset.id;
            this.viewDetails(id);
         });
      });
   }

   viewDetails(idGame) {
      const details = new Details(idGame);
      document.querySelector(".games").classList.add("d-none");
      document.querySelector(".details").classList.remove("d-none");
   }
}
