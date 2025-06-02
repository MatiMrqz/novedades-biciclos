import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ redirect,request }) => {
  const formData = await request.formData();
  const { idBiciclo, idDelegacion,idOficial } = Object.fromEntries(formData.entries());
  try {
    if(isNaN(Number(idBiciclo)) || isNaN(Number(idDelegacion)) || isNaN(Number(idOficial))) throw new Error("IDs no válidos");
    const del = await supabase
      .from('Pertenece')
      .delete()
      .eq('Biciclo', Number(idBiciclo))
      .eq('Delegacion', Number(idDelegacion))
      .eq('Oficial', Number(idOficial))
    if (del.error) throw del.error
    return redirect("/asociaciones");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};