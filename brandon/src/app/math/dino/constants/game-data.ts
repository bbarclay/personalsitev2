import { Character, Era, Achievement, IntroStep } from '../types';

export const CHARACTERS: Record<string, Character> = {
  drFossil: { name: "Dr. Fossil", color: "#795548", emoji: "🧑‍🔬" },
  captainClaw: { name: "Captain Claw", color: "#673AB7", emoji: "🦕" },
  xenoTraveler: { name: "Xeno Traveler", color: "#009688", emoji: "🚀" },
};

export const ERAS: Era[] = [
  { name: "Triassic Trails", color: "#4CAF50", description: "Where dinosaurs first roamed!", icon: "🌱" },
  { name: "Jurassic Jungle", color: "#8BC34A", description: "Home to the giant sauropods!", icon: "🌴" },
  { name: "Cretaceous Caves", color: "#FFC107", description: "Where T-Rex rose to fame!", icon: "🦖" },
  { name: "Paleozoic Portal", color: "#FF5722", description: "Travel back even before the dinos!", icon: "⏳" },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'time_traveler', name: 'Time Traveler', description: 'Begin your dinosaur adventure', unlocked: false },
  { id: 'era_explorer', name: 'Era Explorer', description: 'Visit all dinosaur eras', unlocked: false },
  { id: 'fossil_finder', name: 'Fossil Finder', description: 'Collect 10 unique fossils', unlocked: false },
  { id: 'memory_master', name: 'Memory Master', description: 'Win the Dino Name Memory Game', unlocked: false },
];

export const INTRO_STEPS: IntroStep[] = [
  { text: "Welcome to DinoAdventure! I'm Dr. Fossil, your guide through time.", character: "drFossil" },
  { text: "Prepare to explore prehistoric eras and collect fossils along the way.", character: "drFossil" },
  { text: "Each era has surprises, trivia, and a chance to earn points and achievements.", character: "drFossil" },
  { text: "Strap on your boots. It's time to travel millions of years back in time!", character: "drFossil" }
];

export const DINO_FACTS: string[] = [
  "The word 'dinosaur' means 'terrible lizard' in Greek.",
  "Velociraptors likely had feathers and were much smaller than in movies.",
  "Triceratops had up to 800 teeth, constantly replaced throughout its lifetime.",
  "Some sauropods could grow longer than 3 school buses end to end.",
  "The T. rex's roar in Jurassic Park was a mix of a baby elephant, a tiger, and an alligator.",
  "Pterosaurs are not dinosaurs but are closely related flying reptiles.",
  "The first dinosaur fossil was recognized in the early 19th century.",
  "Dinosaurs lived on all continents, including Antarctica.",
  "Paleontologists have named over 700 different dinosaur genera.",
  "Some dinosaurs, like the Microraptor, were as small as a crow!"
];

export const AVAILABLE_FOSSILS: string[] = [
  "Triceratops Horn", "T-Rex Tooth", "Stegosaurus Plate",
  "Sauropod Vertebra", "Dino Egg Fragment", "Pterodactyl Wing",
  "Velociraptor Claw", "Mosasaur Tooth", "Ankylosaurus Club",
  "Ammonite Shell"
];

export const DINO_NAME_POOL: string[] = [
  "Tyrannosaurus", "Velociraptor", "Triceratops",
  "Stegosaurus", "Brachiosaurus", "Allosaurus",
  "Ankylosaurus", "Parasaurolophus", "Spinosaurus",
  "Pteranodon", "Iguanodon", "Diplodocus"
];

export const FLOATING_ICONS = ["🦴", "🦕", "🦖", "👣", "🌋", "🦴"];
