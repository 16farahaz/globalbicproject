export function getInitials(fullName) { //fonction pour obtenir les initiales d'un nom complet

    const names = fullName.split(""); // couper le nom complet en tableau de caractères 
    const initials = names.slice(0,2).map((name)=>name[0].toUpperCase()); // prendre les deux premiers caractères de chaque mot et les mettre en majuscule 
    const initialsStr= initials.join(""); // joindre les initiales en une seule chaine de caractères
    return initialsStr; // retourner les initiales


    
};

export const PRIOTITYSTYELS = {
    Présentiel: "text-red-600",
    Hybride: "text-yellow-600",
    "En ligne": "text-blue-600",
  };
  
  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];
export const TYPESTYLES = {
  "Technique": "bg-blue-100 text-blue-800",
  "Soft Skills": "bg-green-100 text-green-800",
  "Management": "bg-yellow-100 text-yellow-800",
  "Cybersécurité": "bg-red-100 text-red-800",
};
export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Get hours, minutes and seconds with leading zeros
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds = String(inputDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
