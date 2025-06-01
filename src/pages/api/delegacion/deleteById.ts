import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ redirect,request }) => {
  const formData = await request.formData();
  const { id } = Object.fromEntries(formData.entries());
  try {
    if(isNaN(Number(id))) throw new Error("ID no válido");
    const del = await supabase
      .from('Delegacion')
      .delete()
      .eq('NroDelegacion', Number(id))
    if (del.error) throw del.error
    return redirect("/delegaciones");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};