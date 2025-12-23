import { useEffect, useState } from "react";
import { useParams } from "react-router";

import './RecipeDetails.css';

const RecipeDetails = () => {

    const { id } = useParams();

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;

                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();
                setDetails(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [id]);

    if (loading) return <p>Loading…</p>;
    if (!details) return <p>Not found</p>;

    return (
        <div className="recipe-details">
            <header className="recipe-hero">
                <h1>{details.title}</h1>
                <img src={details.image} alt={details.title} />
                <div className="meta">
                    <span>⏱ {details.readyInMinutes} min</span>
                    <span>🍽 {details.servings} servings</span>
                </div>
            </header>

            <section className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {details.extendedIngredients.map(ing => (
                        <li key={ing.id}>
                            <span className="amount">
                                {ing.amount} {ing.unit}
                            </span>
                            <span className="name">{ing.name}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="instructions">
                <h2>Instructions</h2>
                {details.analyzedInstructions.length > 0 ? (
                    <ol>
                        {details.analyzedInstructions[0].steps.map(step => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: details.instructions }} />
                )}
            </section>
        </div>

    );
};

export default RecipeDetails;
