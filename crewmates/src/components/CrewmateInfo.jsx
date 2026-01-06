// CrewmateInfo.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../data/config";

import './CrewmateInfo.css'

export default function CrewmateInfo() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOne() {
      setLoading(true);

      const { data, error } = await supabase
        .from("Players")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error.message);
        setCrewmate(null);
      } else {
        setCrewmate(data);
      }

      setLoading(false);
    }

    if (id) fetchOne();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!crewmate) return <div>Not found</div>;

  return (
    <div>
      <h2><span className="titling">Crewmate</span> {crewmate.name}</h2>
      <img src="amongus.png"/>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed}</p>
    </div>
  );
}
