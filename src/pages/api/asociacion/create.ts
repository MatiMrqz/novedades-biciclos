import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request,redirect }) => {
  const formData = await request.formData();
  const { idBiciclo, idOficial, idDelegacion } = Object.fromEntries(formData.entries());

  try {
    const pertenece = await supabase
      .from('Pertenece')
      .insert([
        { Biciclo: idBiciclo, Oficial: idOficial, Delegacion: idDelegacion },
      ])
    if (pertenece.error) throw pertenece.error
    return redirect("/asociaciones");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};