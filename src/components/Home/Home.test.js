//Import des librairies de test
import { render, screen } from "@testing-library/react";
//Import du composant tester
import Home from "./Home";

//La fonction jest de Test
test("Afficher le titre de la page", () => {
  //La fonction render permet de monter un composant dans DOM via jest jsdom
  //Creer un faux navigateur + monter et afficher le composant + la fonction screen qui parcours le DOM et cherche des elements
  render(<Home name="Michael" />);
  //Reponse du test attendue
  expect(screen.getByText("Hello Michael")).toBeInTheDocument(); //Atention au espace entre les elements => le texte est sensible a la case
});
