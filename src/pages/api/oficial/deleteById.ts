import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ redirect,request }) => {
  const formData = await request.formData();
  const { id } = Object.fromEntries(formData.entries());
  try {
    if(isNaN(Number(id))) throw new Error("ID no válido");
    const oficial = await supabase
      .from('Oficial')
      .delete()
      .eq('ID_Persona', Number(id))
    if (oficial.error) throw oficial.error
    const persona = await supabase
      .from('Persona')
      .delete()
      .eq('ID_Persona', Number(id))
    if (persona.error) throw persona.error
    return redirect("/oficiales");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};