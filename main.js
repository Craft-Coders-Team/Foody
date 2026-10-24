
// =========================
// 1. Recipes Data
// =========================

const recipes = {
    thai: {
        title: "Thai Green Curry",
        description:
            "A flavorful Thai green curry made with coconut milk, fresh herbs, vegetables, and your choice of protein.",

        image: "images/recipe1.jpg",

        ingredients: [
            "1 tablespoon vegetable oil",
            "1 onion, chopped",
            "2 cloves garlic, minced",
            "1 tablespoon green curry paste",
            "1 can (14 oz) coconut milk",
            "1 cup mixed vegetables",
            "1 cup chicken, tofu, or shrimp",
            "2 tablespoons fish sauce",
            "1 tablespoon sugar",
            "Fresh basil leaves for garnish"
        ],

        instructions: [
            "Heat the vegetable oil in a large pan over medium heat.",
            "Add the onion and garlic, and sauté until fragrant.",
            "Stir in the green curry paste and cook for 1–2 minutes.",
            "Pour in the coconut milk and bring to a gentle simmer.",
            "Add the vegetables and protein. Cook until the protein is fully cooked and the vegetables are tender.",
            "Add the fish sauce and sugar, adjusting the seasoning to taste.",
            "Garnish with fresh basil and serve with rice."
        ]
    },

    mango: {
        title: "Mango Sticky Rice",
        description:
            "A traditional Thai dessert made with sweet sticky rice, ripe mango slices, and creamy coconut milk.",

        image: "images/recipe2.jpg",

        ingredients: [
            "1 cup sticky rice",
            "1 cup coconut milk",
            "1/3 cup sugar",
            "1/4 teaspoon salt",
            "2 ripe mangoes, sliced",
            "1 teaspoon sesame seeds (optional)"
        ],

        instructions: [
            "Rinse the sticky rice until the water runs mostly clear.",
            "Soak the rice, then steam it according to the package instructions.",
            "Warm the coconut milk with the sugar and salt until dissolved. Do not boil vigorously.",
            "Pour most of the coconut mixture over the cooked rice and let it absorb for 15–20 minutes.",
            "Slice the ripe mangoes.",
            "Serve the sticky rice with mango slices and drizzle with the remaining coconut sauce.",
            "Sprinkle with sesame seeds if desired."
        ]
    },

    tiramisu: {
        title: "Italian Tiramisu",
        description:
            "A classic Italian dessert made with coffee-soaked ladyfingers, creamy mascarpone, and a delicate dusting of cocoa powder.",

        image: "images/recipe3.jpg",

        ingredients: [
            "1 cup strong brewed coffee, cooled",
            "3 tablespoons coffee liqueur (optional)",
            "3 large eggs, separated",
            "1/2 cup sugar",
            "1 cup mascarpone cheese",
            "About 24 ladyfinger biscuits",
            "Unsweetened cocoa powder",
            "Dark chocolate shavings (optional)"
        ],

        instructions: [
            "Brew the coffee and allow it to cool completely.",
            "Beat the egg yolks with the sugar until pale and creamy.",
            "Mix in the mascarpone until smooth.",
            "In a separate clean bowl, beat the egg whites until stiff peaks form, then gently fold them into the mascarpone mixture. Alternatively, use a pasteurized-egg or egg-free recipe.",
            "Dip each ladyfinger briefly into the cooled coffee.",
            "Arrange a layer of ladyfingers in a dish, followed by a layer of mascarpone cream.",
            "Repeat the layers and finish with the cream.",
            "Cover and refrigerate for at least 4–6 hours.",
            "Dust with cocoa powder before serving."
        ]
    },

    kebab: {
        title: "Turkish Kebabs",
        description:
            "Juicy grilled meat seasoned with aromatic Turkish spices and fresh herbs, served with grilled vegetables.",

        image: "images/recipe4.jpg",

        ingredients: [
            "500 g ground beef or lamb",
            "1 small onion, finely grated",
            "2 cloves garlic, minced",
            "1 teaspoon paprika",
            "1 teaspoon ground cumin",
            "1/2 teaspoon black pepper",
            "1 teaspoon salt, or to taste",
            "2 tablespoons chopped parsley",
            "1 tablespoon olive oil",
            "Bell peppers and tomatoes for serving"
        ],

        instructions: [
            "Combine the ground meat, grated onion, garlic, spices, parsley, and olive oil in a bowl.",
            "Mix thoroughly until the ingredients are evenly distributed.",
            "Shape the mixture around skewers or into elongated kebabs.",
            "Preheat a grill or grill pan to medium-high heat.",
            "Grill the kebabs, turning occasionally, until browned and fully cooked. Cooking time depends on their thickness.",
            "Grill the vegetables alongside the meat until tender.",
            "Serve hot with flatbread, rice, salad, or yogurt sauce."
        ]
    }
};


// =========================
// 2. Select HTML Elements
// =========================

const recipeButtons = document.querySelectorAll(".recipe-btn");

const recipeModal = document.getElementById("recipeModal");
const recipeContent = document.querySelector(".recipe-content");

const recipeImage = document.getElementById("recipeImage");
const recipeTitle = document.getElementById("recipeTitle");
const recipeDescription = document.getElementById("recipeDescription");

const recipeIngredients =
    document.getElementById("recipeIngredients");

const recipeInstructions =
    document.getElementById("recipeInstructions");

const closeRecipeBtn =
    document.getElementById("closeRecipe");

let lastFocusedElement = null;


// =========================
// 3. Show Selected Recipe
// =========================

function showRecipe(recipeKey) {
    const recipe = recipes[recipeKey];

    // Stop if the recipe does not exist
    if (!recipe) {
        console.error("Recipe not found:", recipeKey);
        return;
    }

    // Remember the button that opened the modal
    lastFocusedElement = document.activeElement;

    // Display the recipe title and description
    recipeTitle.textContent = recipe.title;
    recipeDescription.textContent = recipe.description;

    // Display the recipe image
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;

    // Display ingredients
    recipeIngredients.replaceChildren();

    recipe.ingredients.forEach(function (ingredient) {
        const li = document.createElement("li");

        li.textContent = ingredient;

        recipeIngredients.appendChild(li);
    });

    // Display cooking instructions
    recipeInstructions.replaceChildren();

    recipe.instructions.forEach(function (instruction) {
        const li = document.createElement("li");

        li.textContent = instruction;

        recipeInstructions.appendChild(li);
    });

    // Open the modal
    recipeModal.classList.add("active");
    recipeModal.setAttribute("aria-hidden", "false");

    // Move keyboard focus into the modal
    closeRecipeBtn.focus();

    // Prevent the page behind the modal from scrolling
    document.body.style.overflow = "hidden";
}


// =========================
// 4. Connect All Recipe Buttons
// =========================

recipeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const recipeKey = button.dataset.recipe;

        showRecipe(recipeKey);
    });
});


// =========================
// 5. Close the Modal
// =========================

function closeRecipe() {
    recipeModal.classList.remove("active");
    recipeModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Return focus to the button that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}


// Close with the X button
closeRecipeBtn.addEventListener("click", closeRecipe);


// Close by clicking the dark background
recipeModal.addEventListener("click", function (event) {
    if (event.target === recipeModal) {
        closeRecipe();
    }
});


// Close by pressing Escape
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        recipeModal.classList.contains("active")
    ) {
        closeRecipe();
    }
});


// Keep clicks inside the recipe content from closing the modal
recipeContent.addEventListener("click", function (event) {
    event.stopPropagation();
});
